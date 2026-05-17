import pool from '../../db/Connection.js';

const runQuery = (sql, params = []) =>
  new Promise((resolve, reject) => {
    pool.query(sql, params, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });

const normalizeSort = (sortBy, sortDir) => {
  const dir = String(sortDir || 'desc').toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
  const allowed = new Set(['created_at', 'deadline', 'priority', 'urgency', 'status']);
  const col = allowed.has(sortBy) ? sortBy : 'created_at';
  return { col, dir };
};

export const listCases = async ({
  page = 1,
  pageSize = 10,
  q,
  status,
  priority,
  category,
  dateFrom,
  dateTo,
  sortBy,
  sortDir,
} = {}) => {
  const where = ['c.deleted_at IS NULL'];
  const params = [];

  if (q) {
    where.push('(c.title LIKE ? OR c.description LIKE ?)');
    params.push(`%${q}%`, `%${q}%`);
  }
  if (status) {
    where.push('c.status = ?');
    params.push(status);
  }
  if (priority) {
    where.push('c.priority = ?');
    params.push(priority);
  }
  if (category) {
    where.push('c.category = ?');
    params.push(category);
  }
  if (dateFrom) {
    where.push('c.created_at >= ?');
    params.push(dateFrom);
  }
  if (dateTo) {
    where.push('c.created_at <= ?');
    params.push(dateTo);
  }

  const { col, dir } = normalizeSort(sortBy, sortDir);
  const offset = (page - 1) * pageSize;

  const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';

  const countSql = `
    SELECT COUNT(*) AS total
    FROM cases c
    ${whereSql}
  `;

  const rowsSql = `
    SELECT 
      c.case_id,
      c.title,
      c.status,
      c.priority,
      c.category,
      c.description,
      c.created_at,
      c.deadline,
      c.urgency,
      client.name AS client_name,
      client.image_url AS client_image,
      lawyer.name AS lawyer_name,
      lawyer.image_url AS lawyer_image,
      COALESCE(a.activity_count, 0) AS activity_count,
      COALESCE(d.doc_count, 0) AS doc_count,
      COALESCE(m.msg_count, 0) AS msg_count
    FROM cases c
    LEFT JOIN users client ON c.client_id = client.user_id
    LEFT JOIN users lawyer ON c.lawyer_id = lawyer.user_id
    LEFT JOIN (
      SELECT case_id, COUNT(*) AS activity_count
      FROM case_activities
      WHERE deleted_at IS NULL
      GROUP BY case_id
    ) a ON a.case_id = c.case_id
    LEFT JOIN (
      SELECT case_id, COUNT(*) AS doc_count
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
    ${whereSql}
    ORDER BY c.${col} ${dir}
    LIMIT ? OFFSET ?
  `;

  const [{ total }] = await pool.promise().query(countSql, params);
  const rows = await runQuery(rowsSql, [...params, pageSize, offset]);

  return {
    rows,
    meta: {
      page,
      pageSize,
      total: total || 0,
      totalPages: Math.max(1, Math.ceil((total || 0) / pageSize)),
    },
  };
};

export const getCaseById = async (caseId) => {
  // This is DB-driven; normalized tables will be added in PHASE 2.
  const sql = `
    SELECT 
      c.*, 
      client.name AS client_name, client.image_url AS client_image,
      lawyer.name AS lawyer_name, lawyer.image_url AS lawyer_image
    FROM cases c
    LEFT JOIN users client ON c.client_id = client.user_id
    LEFT JOIN users lawyer ON c.lawyer_id = lawyer.user_id
    WHERE c.case_id = ? AND c.deleted_at IS NULL
    LIMIT 1
  `;

  const [rows] = await pool.promise().query(sql, [caseId]);
  if (!rows || rows.length === 0) return null;

  const base = rows[0];

  const [hearings] = await pool.promise().query(
    `SELECT * FROM hearings WHERE case_id = ? AND deleted_at IS NULL ORDER BY due_date ASC`,
    [caseId]
  );
  const [activities] = await pool.promise().query(
    `SELECT * FROM case_activities WHERE case_id = ? AND deleted_at IS NULL ORDER BY created_at DESC`,
    [caseId]
  );
  const [messages] = await pool.promise().query(
    `SELECT * FROM case_messages WHERE case_id = ? AND deleted_at IS NULL ORDER BY created_at ASC`,
    [caseId]
  );
  const [documents] = await pool.promise().query(
    `SELECT * FROM documents WHERE case_id = ? AND deleted_at IS NULL ORDER BY uploaded_at DESC`,
    [caseId]
  );
  const [escalations] = await pool.promise().query(
    `SELECT * FROM escalations WHERE case_id = ? AND deleted_at IS NULL ORDER BY created_at DESC`,
    [caseId]
  );
  const [deadlines] = await pool.promise().query(
    `SELECT * FROM case_deadlines WHERE case_id = ? AND deleted_at IS NULL ORDER BY due_date ASC`,
    [caseId]
  );
  const [alerts] = await pool.promise().query(
    `SELECT * FROM notifications WHERE case_id = ? AND deleted_at IS NULL ORDER BY created_at DESC`,
    [caseId]
  );

  const risk = await getCaseAnalytics(caseId).then((r) => r || {});

  return {
    case: base,
    lawyer: {
      lawyer_id: base.lawyer_id,
      name: base.lawyer_name,
      image_url: base.lawyer_image,
    },
    client: {
      client_id: base.client_id,
      name: base.client_name,
      image_url: base.client_image,
    },
    hearings,
    activities,
    messages,
    documents,
    escalations,
    deadlines,
    alerts,
    analytics: risk,
    risk: {
      riskScore: risk?.riskScore ?? 0,
      overdueHearingsCount: risk?.overdueHearingsCount ?? 0,
    },
    timeline: [
      ...(deadlines || []).map((d) => ({ kind: 'deadline', created_at: d.created_at, due_date: d.due_date, ...d })),
      ...(hearings || []).map((h) => ({ kind: 'hearing', created_at: h.created_at, due_date: h.due_date, ...h })),
      ...(activities || []).map((a) => ({ kind: 'activity', created_at: a.created_at, ...a })),
    ].sort((a, b) => new Date(a.created_at || a.due_date) - new Date(b.created_at || b.due_date)),
  };
};

export const getCaseDocuments = async (caseId) => {
  const [documents] = await pool.promise().query(
    `SELECT * FROM documents WHERE case_id = ? AND deleted_at IS NULL ORDER BY uploaded_at DESC`,
    [caseId]
  );

  return documents.map((d) => ({
    document_id: d.document_id,
    file_url: d.file_url,
    file_name: d.file_name,
    uploaded_at: d.uploaded_at,
    uploader_user_id: d.uploaded_by,
    document_type: d.document_type || d.kind || 'DOCUMENT',
    verification_status: d.verification_status || null,
  }));
};

export const getCaseHearings = async (caseId) => {
  const [hearings] = await pool.promise().query(
    `SELECT * FROM hearings WHERE case_id = ? AND deleted_at IS NULL ORDER BY due_date ASC`,
    [caseId]
  );

  return hearings.map((h) => ({
    hearing_id: h.hearing_id,
    court_date: h.due_date,
    courtroom: h.courtroom || null,
    hearing_type: h.hearing_type || null,
    assigned_lawyer_id: h.assigned_lawyer_id || null,
    hearing_status: h.hearing_status || (h.due_date ? (new Date(h.due_date) < new Date() ? 'OVERDUE' : 'UPCOMING') : null),
    countdown_metadata: h.due_date ? {
      due_date: h.due_date,
      minutes_until: Math.floor((new Date(h.due_date).getTime() - Date.now()) / 60000),
    } : null,
  }));
};

export const getCaseMessages = async (caseId, actorUserId = null) => {
  const [messages] = await pool.promise().query(
    `SELECT * FROM case_messages WHERE case_id = ? AND deleted_at IS NULL ORDER BY created_at ASC`,
    [caseId]
  );

  // unread_status is best-effort since we don't have a per-user read-tracking schema yet.
  return messages.map((m) => ({
    message_id: m.message_id,
    sender_user_id: m.sender_user_id,
    sender_name: m.sender_name || null,
    role: m.sender_user_id === actorUserId ? 'LAWYER_OR_ADMIN' : 'CLIENT_OR_OTHER',
    content: m.text,
    timestamps: { created_at: m.created_at },
    unread: Boolean(m.is_unread || 0),
  }));
};

export const getCaseAnalytics = async (caseId) => {
  const [activities] = await pool.promise().query(
    `SELECT COUNT(*) AS activity_count, MAX(created_at) AS last_activity_at
     FROM case_activities WHERE case_id = ? AND deleted_at IS NULL`,
    [caseId]
  );

  const [hearings] = await pool.promise().query(
    `SELECT * FROM hearings WHERE case_id = ? AND deleted_at IS NULL`,
    [caseId]
  );

  const overdueHearingsCount = (hearings || []).filter((h) => h?.due_date && new Date(h.due_date) < new Date()).length;

  const [escal] = await pool.promise().query(
    `SELECT COUNT(*) AS escalations_count FROM escalations WHERE case_id = ? AND deleted_at IS NULL`,
    [caseId]
  );

  const escalationsCount = escal?.[0]?.escalations_count || 0;

  const [msgs] = await pool.promise().query(
    `SELECT COUNT(*) AS msg_count FROM case_messages WHERE case_id = ? AND deleted_at IS NULL`,
    [caseId]
  );

  const msgCount = msgs?.[0]?.msg_count || 0;

  const [docs] = await pool.promise().query(
    `SELECT COUNT(*) AS doc_count FROM documents WHERE case_id = ? AND deleted_at IS NULL`,
    [caseId]
  );

  const docCount = docs?.[0]?.doc_count || 0;

  // Deterministic scoring (will evolve in Phase 5 business logic engine)
  const riskScore = Math.min(100, overdueHearingsCount * 20 + escalationsCount * 6 + Math.max(0, 10 - (msgCount + docCount)));

  return {
    activityScore: Math.min(100, (activities?.[0]?.activity_count || 0) * 5),
    responseTimes: [],
    riskScore,
    overdueHearingsCount,
    completionPercent: null,
    escalationHistory: escalationsCount,
  };
};


export const getCasesStats = async () => {
  const [total] = await pool.promise().query(
    `SELECT COUNT(*) AS total FROM cases WHERE deleted_at IS NULL`
  );
  const [open] = await pool.promise().query(
    `SELECT COUNT(*) AS openCases FROM cases WHERE deleted_at IS NULL AND status NOT IN ('Closed')`
  );
  const [overdue] = await pool.promise().query(
    `SELECT COUNT(*) AS overdueCases FROM cases WHERE deleted_at IS NULL AND deadline IS NOT NULL AND deadline < NOW()`
  );
  return {
    totalCases: total?.[0]?.total || 0,
    openCases: open?.[0]?.openCases || 0,
    overdueCases: overdue?.[0]?.overdueCases || 0,
  };
};

export const getCasesAnalytics = async () => {
  const [byStatus] = await pool.promise().query(
    `SELECT status, COUNT(*) AS count FROM cases WHERE deleted_at IS NULL GROUP BY status ORDER BY count DESC`
  );
  return {
    byStatus,
  };
};

export const getCasesWorkload = async () => {
  const [rows] = await pool.promise().query(
    `SELECT lawyer_id, COUNT(*) AS cases_count FROM cases WHERE deleted_at IS NULL GROUP BY lawyer_id ORDER BY cases_count DESC`
  );
  return { workload: rows };
};

export const getCasesPerformance = async () => {
  const [rows] = await pool.promise().query(
    `SELECT lawyer_id, AVG(CASE WHEN status='Closed' THEN 1 ELSE 0 END) AS success_rate FROM cases WHERE deleted_at IS NULL GROUP BY lawyer_id`
  );
  return { performance: rows };
};

export const getCasesActivity = async ({ caseId, page = 1, pageSize = 20 } = {}) => {
  const where = ['a.deleted_at IS NULL'];
  const params = [];
  if (caseId) {
    where.push('a.case_id = ?');
    params.push(caseId);
  }

  const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';
  const offset = (page - 1) * pageSize;

  const [countRows] = await pool.promise().query(
    `SELECT COUNT(*) AS total FROM case_activities a ${whereSql}`,
    params
  );

  const [rows] = await pool.promise().query(
    `SELECT a.* , u.name AS actor_name FROM case_activities a
     LEFT JOIN users u ON u.user_id = a.actor_user_id
     ${whereSql}
     ORDER BY a.created_at DESC
     LIMIT ? OFFSET ?`,
    [...params, pageSize, offset]
  );

  return {
    rows,
    meta: {
      page,
      pageSize,
      total: countRows?.[0]?.total || 0,
      totalPages: Math.max(1, Math.ceil((countRows?.[0]?.total || 0) / pageSize)),
    },
  };
};

export const postCaseActivity = async (caseId, { type, text, actorUserId } = {}) => {
  const sql = `
    INSERT INTO case_activities (case_id, type, text, actor_user_id, created_at)
    VALUES (?, ?, ?, ?, NOW())
  `;

  await runQuery(sql, [caseId, type || 'NOTE', text || null, actorUserId || null]);

  return { ok: true };
};

export const getCasesAlerts = async () => {
  const [rows] = await pool.promise().query(
    `SELECT n.* FROM notifications n WHERE n.deleted_at IS NULL ORDER BY n.created_at DESC LIMIT 100`
  );
  return { alerts: rows };
};

export const escalateCase = async (caseId, { reason, actorUserId } = {}) => {
  const conn = await pool.promise().getConnection();
  try {
    await conn.query(
      `INSERT INTO escalations (case_id, reason, actor_user_id, created_at)
       VALUES (?, ?, ?, NOW())`,
      [caseId, reason || null, actorUserId || null]
    );

    await conn.query(
      `INSERT INTO notifications (case_id, type, message, is_read, created_at, deleted_at)
       VALUES (?, 'ESCALATED', ?, 0, NOW(), NULL)`,
      [caseId, reason || 'Case escalated']
    );

    return { ok: true };
  } finally {
    conn.release();
  }
};

export const updateCaseStatus = async (caseId, { status, actorUserId } = {}) => {
  await runQuery(
    `UPDATE cases SET status = ? WHERE case_id = ? AND deleted_at IS NULL`,
    [status, caseId]
  );

  await runQuery(
    `INSERT INTO admin_logs (case_id, action, actor_user_id, created_at)
     VALUES (?, 'STATUS_UPDATED', ?, NOW())`,
    [caseId, actorUserId || null]
  );

  return { ok: true };
};

export const postCaseNotes = async (caseId, { notes, actorUserId } = {}) => {
  await runQuery(
    `INSERT INTO case_activities (case_id, type, text, actor_user_id, created_at)
     VALUES (?, 'NOTE', ?, ?, NOW())`,
    [caseId, notes || null, actorUserId || null]
  );

  return { ok: true };
};

