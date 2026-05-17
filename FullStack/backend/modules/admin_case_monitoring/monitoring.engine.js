import pool from '../../db/Connection.js';
import { emitToAdminMonitoring, emitToCaseRoom } from '../../Sockets/adminMonitoring Socket.js';

// Admin monitoring engine (Phase 5):
// - checks inactive cases
// - overdue hearing alerts
// - risk detection based on overdue + escalations + activity
//
// NOTE:
// - Messages/hearings/documents are partially stored in MongoDB via existing chat/message modules.
// - This engine focuses on MariaDB-driven case/alert/escalation/status sources.

const DEFAULTS = {
  inactiveDays: 7,
  overdueGraceHours: 0,
  riskThreshold: 70,
  engineIntervalMs: 60 * 1000,
};

const toSqlDate = (d) => {
  if (!d) return null;
  const dt = new Date(d);
  // MySQL DATETIME accepts ISO without timezone (best-effort)
  return dt.toISOString().slice(0, 19).replace('T', ' ');
};

const computeRiskScore = ({ inactiveDays, overdueHearingsCount, escalationsCount, msgCount, docCount }) => {
  // Deterministic, explainable scoring. Range 0..100
  const inactiveScore = Math.min(30, inactiveDays * 3);
  const overdueScore = Math.min(50, overdueHearingsCount * 15);
  const escalationScore = Math.min(20, escalationsCount * 6);
  const activityScore = Math.min(20, (msgCount || 0) * 1.5 + (docCount || 0) * 1);

  // Higher score should mean higher risk; reduce risk by activityScore a bit.
  const raw = inactiveScore + overdueScore + escalationScore + Math.max(0, 10 - activityScore);
  return Math.max(0, Math.min(100, Math.round(raw)));
};

const ensureAlert = async ({ caseId, type, message, isRead = 0 }) => {
  // Upsert-ish: if an alert of same type exists recently, avoid duplicates.
  // For simplicity: check last 1 day.
  const [rows] = await pool.promise().query(
    `SELECT notification_id FROM notifications
     WHERE case_id = ? AND type = ? AND deleted_at IS NULL
       AND created_at >= DATE_SUB(NOW(), INTERVAL 1 DAY)
     ORDER BY created_at DESC LIMIT 1`,
    [caseId, type]
  );

  if (rows && rows.length) return { created: false };

  await pool.promise().query(
    `INSERT INTO notifications (case_id, type, message, is_read, created_at, deleted_at)
     VALUES (?, ?, ?, ?, NOW(), NULL)`,
    [caseId, type, message, isRead]
  );

  return { created: true };
};

const listCasesForMonitoring = async () => {
  // Need at least: case_id, status, created_at, deadline, urgency, category, priority, lawyer/client.
  // Also join normalized tables for hearings/activities/documents/escalations.
  const [rows] = await pool.promise().query(
    `SELECT
       c.case_id,
       c.status,
       c.created_at,
       c.deadline,
       c.urgency,
       c.priority,
       c.category,
       c.lawyer_id,
       c.client_id,
       COALESCE(act.last_activity_at, c.created_at) AS last_activity_at,
       COALESCE(h.overdue_hearings_count, 0) AS overdue_hearings_count,
       COALESCE(e.escalations_count, 0) AS escalations_count,
       COALESCE(d.docs_count, 0) AS docs_count,
       COALESCE(m.msg_count, 0) AS msg_count
     FROM cases c
     LEFT JOIN (
       SELECT case_id, MAX(created_at) AS last_activity_at
       FROM case_activities
       WHERE deleted_at IS NULL
       GROUP BY case_id
     ) act ON act.case_id = c.case_id
     LEFT JOIN (
       SELECT case_id,
         SUM(CASE WHEN due_date IS NOT NULL AND due_date < NOW() THEN 1 ELSE 0 END) AS overdue_hearings_count
       FROM hearings
       WHERE deleted_at IS NULL
       GROUP BY case_id
     ) h ON h.case_id = c.case_id
     LEFT JOIN (
       SELECT case_id, COUNT(*) AS escalations_count
       FROM escalations
       WHERE deleted_at IS NULL
       GROUP BY case_id
     ) e ON e.case_id = c.case_id
     LEFT JOIN (
       SELECT case_id, COUNT(*) AS docs_count
       FROM documents
       WHERE deleted_at IS NULL
       GROUP BY case_id
     ) d ON d.case_id = c.case_id
     LEFT JOIN (
       SELECT case_id, COUNT(*) AS msg_count
       FROM case_messages
       WHERE deleted_at IS NULL
       GROUP BY case_id
     ) m ON m.case_id = c.case_id
     WHERE c.deleted_at IS NULL
     AND c.status NOT IN ('Closed')`
  );

  return rows;
};

export const startMonitoringEngine = ({ engineIntervalMs } = {}) => {
  const cfg = { ...DEFAULTS, engineIntervalMs: engineIntervalMs ?? DEFAULTS.engineIntervalMs };

  const tick = async () => {
    try {
      const cases = await listCasesForMonitoring();

      for (const c of cases) {
        const lastActivity = c.last_activity_at ? new Date(c.last_activity_at) : new Date(c.created_at);
        const now = new Date();
        const inactiveDays = Math.max(0, Math.floor((now - lastActivity) / (24 * 60 * 60 * 1000)));

        const overdueHearingsCount = Number(c.overdue_hearings_count || 0);
        const escalationsCount = Number(c.escalations_count || 0);
        const msgCount = Number(c.msg_count || 0);
        const docCount = Number(c.docs_count || 0);

        const riskScore = computeRiskScore({
          inactiveDays,
          overdueHearingsCount,
          escalationsCount,
          msgCount,
          docCount,
        });

        // Inactive detection
        if (inactiveDays >= cfg.inactiveDays) {
          const message = `Inactive case detected: ${inactiveDays} days since last activity.`;
          const result = await ensureAlert({
            caseId: c.case_id,
            type: 'INACTIVE_CASE',
            message,
          });
          if (result.created) {
            emitToCaseRoom(c.case_id, 'overdue_case', {
              caseId: c.case_id,
              type: 'INACTIVE_CASE',
              message,
              riskScore,
            });
            emitToAdminMonitoring('alert_created', { caseId: c.case_id, type: 'INACTIVE_CASE', message, riskScore });
          }
        }

        // Overdue hearings
        if (overdueHearingsCount > 0) {
          const message = `Overdue hearings detected: ${overdueHearingsCount} hearing(s) past due.`;
          const result = await ensureAlert({
            caseId: c.case_id,
            type: 'HEARING_OVERDUE',
            message,
          });
          if (result.created) {
            emitToCaseRoom(c.case_id, 'hearing_alert', {
              caseId: c.case_id,
              type: 'HEARING_OVERDUE',
              message,
              overdueHearingsCount,
              riskScore,
            });
            emitToAdminMonitoring('hearing_alert', { caseId: c.case_id, type: 'HEARING_OVERDUE', message, overdueHearingsCount, riskScore });
          }
        }

        // Risk detected
        if (riskScore >= cfg.riskThreshold) {
          const message = `Risk threshold exceeded. Current risk score: ${riskScore}/100.`;
          const result = await ensureAlert({
            caseId: c.case_id,
            type: 'RISK_DETECTED',
            message,
          });
          if (result.created) {
            emitToCaseRoom(c.case_id, 'risk_detected', {
              caseId: c.case_id,
              riskScore,
              inactiveDays,
              overdueHearingsCount,
              escalationsCount,
            });
            emitToAdminMonitoring('risk_detected', {
              caseId: c.case_id,
              riskScore,
              inactiveDays,
              overdueHearingsCount,
              escalationsCount,
            });
          }
        }
      }

      emitToAdminMonitoring('dashboard_stats_updated', { at: new Date().toISOString() });
    } catch (err) {
      // Avoid spamming logs + keep Admin UI stable when DB schema/migration is missing.
      console.error('Monitoring engine tick failed:', err?.message || err);

      // If DB schema/table is missing, disable further ticks.
      const message = String(err?.message || '');
      const isMissingTable = err?.code === 'ER_NO_SUCH_TABLE' || message.toLowerCase().includes("doesn't exist") || message.toLowerCase().includes("doesn\u0027t exist");
      if (isMissingTable) {
        console.warn('Monitoring engine disabled due to missing DB table(s).');
        clearInterval(interval);
        return;
      }
    }

  };


  tick();
  const interval = setInterval(tick, cfg.engineIntervalMs);

  return () => clearInterval(interval);
};

