import pool from '../../db/Connection.js';

const runQuery = (sql, params = []) =>
  new Promise((resolve, reject) => {
    pool.query(sql, params, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });

const buildActionType = (action = '') => {
  const method = action.split(' ')[0]?.toUpperCase();
  switch (method) {
    case 'POST': return 'CREATE';
    case 'PUT': return 'UPDATE';
    case 'PATCH': return 'UPDATE';
    case 'DELETE': return 'DELETE';
    case 'GET': return 'READ';
    default: return 'OTHER';
  }
};

export const getAllUsers = async () => {
  const query = `
    SELECT 
      u.user_id, u.name, u.email, u.role, u.gender, u.Phone_no1, u.Phone_no2,
      u.Date_of_Birth, u.image_url, u.created_at,
      l.license_number, l.years_experience, l.verified,
      a.authority_level,
      c.income_level
    FROM users u
    LEFT JOIN lawyer l ON u.user_id = l.user_id
    LEFT JOIN admin a ON u.user_id = a.user_id
    LEFT JOIN client c ON u.user_id = c.user_id
    WHERE u.deleted_at IS NULL
    ORDER BY u.created_at DESC
  `;

  const result = await runQuery(query);
  return result;
};

export const getUserByEmail = async (email) => {
  const query = `
    SELECT 
      u.user_id, u.name, u.email, u.role, u.gender, u.Phone_no1, u.Phone_no2,
      u.Date_of_Birth, u.image_url, u.created_at,
      l.license_number, l.years_experience, l.verified,
      a.authority_level,
      c.income_level,
      GROUP_CONCAT(ls.spec_name SEPARATOR ',') AS specializations
    FROM users u
    LEFT JOIN lawyer l ON u.user_id = l.user_id
    LEFT JOIN admin a ON u.user_id = a.user_id
    LEFT JOIN client c ON u.user_id = c.user_id
    LEFT JOIN lawyer_specializations ls ON l.user_id = ls.lawyer_id
    WHERE u.email = ? AND u.deleted_at IS NULL
    GROUP BY u.user_id
    LIMIT 1
  `;

  const [rows] = await pool.promise().query(query, [email]);
  return rows.length > 0 ? rows[0] : null;
};

export const getAllLawyers = async () => {
  const query = `
    SELECT 
      u.user_id, u.name, u.email, u.image_url, u.created_at,
      l.license_number, l.years_experience, l.rating_avg, l.verified,
      GROUP_CONCAT(ls.spec_name SEPARATOR ',') AS specializations
    FROM users u
    LEFT JOIN lawyer l ON u.user_id = l.user_id
    LEFT JOIN lawyer_specializations ls ON u.user_id = ls.lawyer_id
    WHERE u.role = 'Lawyer' AND u.deleted_at IS NULL
    GROUP BY u.user_id, u.name, u.email, u.image_url, u.created_at, l.license_number, l.years_experience, l.rating_avg, l.verified
    ORDER BY u.created_at DESC
  `;

  const [rows] = await pool.promise().query(query);
  return rows.map((lawyer) => ({
    ...lawyer,
    specializations: lawyer.specializations ? lawyer.specializations.split(',') : []
  }));
};

export const getPendingLawyers = async () => {
  const query = `
    SELECT 
      u.user_id, u.name, u.email, u.image_url, u.created_at,
      l.license_number, l.years_experience, l.rating_avg, l.verified
    FROM users u
    LEFT JOIN lawyer l ON u.user_id = l.user_id
    WHERE u.role = 'Lawyer' AND u.deleted_at IS NULL AND l.verified = 0
    ORDER BY u.created_at DESC
  `;

  const [rows] = await pool.promise().query(query);
  return rows;
};

export const approveLawyer = async (userId, approved) => {
  const verified = approved ? 1 : 0;
  const query = `UPDATE lawyer SET verified = ? WHERE user_id = ?`;
  await runQuery(query, [verified, userId]);
  return { ok: true, verified };
};

export const getAllClients = async () => {
  const query = `
    SELECT 
      u.user_id, u.name, u.email, u.image_url, u.Phone_no1, u.Phone_no2,
      u.Date_of_Birth, u.created_at,
      c.income_level
    FROM users u
    LEFT JOIN client c ON u.user_id = c.user_id
    WHERE u.role = 'Client' AND u.deleted_at IS NULL
    ORDER BY u.created_at DESC
  `;

  const [rows] = await pool.promise().query(query);
  return rows;
};

export const getAllCases = async () => {
  const query = `
    SELECT c.*, 
      client.name AS client_name, client.image_url AS client_image,
      lawyer.name AS lawyer_name, lawyer.image_url AS lawyer_image
    FROM cases c
    LEFT JOIN users client ON c.client_id = client.user_id
    LEFT JOIN users lawyer ON c.lawyer_id = lawyer.user_id
    WHERE c.deleted_at IS NULL
    ORDER BY c.created_at DESC
  `;
  const [rows] = await pool.promise().query(query);
  return rows;
};

export const getCaseMonitoringData = async () => {
  const query = `
    SELECT 
      c.case_id, c.title, c.status, c.category, c.description, c.created_at,
      c.lawyer_id, c.client_id, c.deadline, c.urgency,
      COALESCE(c.msg_count, 0) AS msg_count,
      COALESCE(c.docs_count, 0) AS docs_count,
      client.name AS client_name,
      lawyer.name AS lawyer_name,
      DATEDIFF(NOW(), c.created_at) AS days_active,
      IF(c.deadline IS NOT NULL AND c.deadline < NOW(), 1, 0) AS missed_deadline
    FROM cases c
    LEFT JOIN users client ON c.client_id = client.user_id
    LEFT JOIN users lawyer ON c.lawyer_id = lawyer.user_id
    WHERE c.deleted_at IS NULL
    ORDER BY c.created_at DESC
  `;
  const [rows] = await pool.promise().query(query);
  return rows;
};

export const getFullDashboardData = async () => {
  const [usersResult] = await pool.promise().query(`SELECT COUNT(*) AS count FROM users WHERE deleted_at IS NULL`);
  const [casesResult] = await pool.promise().query(`SELECT COUNT(*) AS count FROM cases WHERE deleted_at IS NULL`);
  const [pendingLawyersResult] = await pool.promise().query(`SELECT COUNT(*) AS count FROM lawyer WHERE verified = 0`);
  const [totalRevenueResult] = await pool.promise().query(`SELECT IFNULL(SUM(amount), 0) AS totalRevenue FROM payment WHERE status = 'Completed'`);
  const [pendingPaymentsResult] = await pool.promise().query(`SELECT COUNT(*) AS count FROM payment WHERE status != 'Completed'`);
  const [unreadMessagesResult] = await pool.promise().query(`SELECT COUNT(*) AS count FROM notification WHERE is_read = 0`);
  const [pendingTasksResult] = await pool.promise().query(`SELECT COUNT(*) AS count FROM cases WHERE status IN ('Pending', 'Awaiting_Payment', 'Awaiting_Client_Approval')`);
  const [recentCases] = await pool.promise().query(`
    SELECT c.case_id, c.title, c.status, c.created_at,
      client.name AS client_name,
      lawyer.name AS lawyer_name
    FROM cases c
    LEFT JOIN users client ON c.client_id = client.user_id
    LEFT JOIN users lawyer ON c.lawyer_id = lawyer.user_id
    WHERE c.deleted_at IS NULL
    ORDER BY c.created_at DESC
    LIMIT 6
  `);

  return {
    stats: {
      users: usersResult[0]?.count || 0,
      cases: casesResult[0]?.count || 0,
      pendingLawyers: pendingLawyersResult[0]?.count || 0
    },
    financial: {
      totalRevenue: totalRevenueResult[0]?.totalRevenue || 0,
      pendingPayments: pendingPaymentsResult[0]?.count || 0
    },
    system: {
      unreadMessages: unreadMessagesResult[0]?.count || 0,
      pendingTasks: pendingTasksResult[0]?.count || 0
    },
    recentCases
  };
};

export const getReportsAnalytics = async () => {
  const [monthlyRevenue] = await pool.promise().query(`
    SELECT DATE_FORMAT(created_at, '%Y-%m') AS month, IFNULL(SUM(amount), 0) AS revenue
    FROM payment
    GROUP BY DATE_FORMAT(created_at, '%Y-%m')
    ORDER BY month DESC
    LIMIT 6
  `);

  const [casesByCategory] = await pool.promise().query(`
    SELECT IFNULL(category, 'Uncategorized') AS category, COUNT(*) AS count,
      ROUND((COUNT(*) / (SELECT COUNT(*) FROM cases WHERE deleted_at IS NULL)) * 100, 2) AS percentage
    FROM cases
    WHERE deleted_at IS NULL
    GROUP BY category
    ORDER BY count DESC
    LIMIT 8
  `);

  const [topLawyers] = await pool.promise().query(`
    SELECT u.name, COUNT(c.case_id) AS cases_count, IFNULL(l.rating_avg, 0) AS rating
    FROM cases c
    LEFT JOIN users u ON c.lawyer_id = u.user_id
    LEFT JOIN lawyer l ON u.user_id = l.user_id
    WHERE c.lawyer_id IS NOT NULL
    GROUP BY u.user_id, u.name, l.rating_avg
    ORDER BY cases_count DESC
    LIMIT 5
  `);

  const [summary] = await pool.promise().query(`
    SELECT 
      IFNULL((SELECT SUM(amount) FROM payment WHERE status = 'Completed'), 0) AS totalEarnings,
      IFNULL((SELECT COUNT(*) FROM cases WHERE status = 'Closed'), 0) AS closedCases,
      IFNULL((SELECT COUNT(*) FROM users WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY) AND deleted_at IS NULL), 0) AS newUsers
  `);

  return {
    monthlyRevenue,
    casesByCategory,
    topLawyers,
    summary: summary[0] || { totalEarnings: 0, closedCases: 0, newUsers: 0 }
  };
};

export const getSystemLogs = async () => {
  const query = `
    SELECT al.log_id, al.user_id, al.action, al.created_at, u.name AS user_name
    FROM activity_log al
    LEFT JOIN users u ON al.user_id = u.user_id
    ORDER BY al.created_at DESC
    LIMIT 200
  `;
  const [rows] = await pool.promise().query(query);
  return rows.map((row) => ({
    ...row,
    action_type: buildActionType(row.action),
  }));
};

export const getAIUsageLogs = async () => {
  const query = `
    SELECT al.log_id, al.user_id, al.action, al.created_at, u.name AS user_name
    FROM activity_log al
    LEFT JOIN users u ON al.user_id = u.user_id
    WHERE al.action LIKE '%ai-tools%'
    ORDER BY al.created_at DESC
    LIMIT 200
  `;
  const [rows] = await pool.promise().query(query);
  return rows.map((row) => ({
    ...row,
    tool: getAIToolName(row.action),
  }));
};

const getAIToolName = (action) => {
  if (action.includes('/v1/ai-tools/research')) return 'Research';
  if (action.includes('/v1/ai-tools/draft')) return 'Document Drafting';
  if (action.includes('/v1/ai-tools/contract-review')) return 'Contract Review';
  if (action.includes('/v1/ai-tools/predict')) return 'Case Outcome Predictor';
  if (action.includes('/v1/ai-tools/chat')) return 'Legal Chatbot';
  return 'AI Tool';
};

export const getFinancialLogs = async () => {
  const query = `
    SELECT payment_id, client_id, case_id, amount, currency, status, created_at
    FROM payment
    ORDER BY created_at DESC
    LIMIT 200
  `;
  const [rows] = await pool.promise().query(query);
  return rows;
};

// ✅ Missing Admin Dashboard endpoints (contract expected by frontend)
export const getAdminProfile = async (req) => {
  const actingUserId = req?.user?.userId || req?.user?.id || null;

  if (actingUserId) {
    const query = `
      SELECT user_id, name, email, role, image_url, authority_level, created_at
      FROM users
      LEFT JOIN admin ON users.user_id = admin.user_id
      WHERE users.user_id = ? AND users.deleted_at IS NULL
      LIMIT 1
    `;
    const [rows] = await pool.promise().query(query, [actingUserId]);
    if (rows?.length) return rows[0];
  }

  const query = `
    SELECT user_id, name, email, role, image_url, authority_level, created_at
    FROM users
    LEFT JOIN admin ON users.user_id = admin.user_id
    WHERE users.deleted_at IS NULL
    ORDER BY users.created_at DESC
    LIMIT 1
  `;
  const [rows] = await pool.promise().query(query);
  return rows?.[0] || null;
};

export const getAdminLogs = async () => {
  const query = `
    SELECT al.log_id, al.user_id, al.action, al.created_at, u.name AS user_name
    FROM activity_log al
    LEFT JOIN users u ON al.user_id = u.user_id
    ORDER BY al.created_at DESC
    LIMIT 200
  `;
  const [rows] = await pool.promise().query(query);
  return rows.map((row) => ({
    ...row,
    action_type: buildActionType(row.action),
  }));
};

export const getAdminDocuments = async () => {
  const query = `
    SELECT document_id, case_id, title, uploaded_at, file_url, uploader_id
    FROM documents
    WHERE deleted_at IS NULL
    ORDER BY uploaded_at DESC
    LIMIT 200
  `;
  const [rows] = await pool.promise().query(query);
  return rows || [];
};

export const getAdminHearings = async () => {
  const query = `
    SELECT hearing_id, case_id, hearing_type, due_date, created_at, status
    FROM hearings
    WHERE deleted_at IS NULL
    ORDER BY due_date ASC
    LIMIT 200
  `;
  const [rows] = await pool.promise().query(query);
  return rows || [];
};

export const getAdminMessages = async () => {
  const query = `
    SELECT message_id, case_id, sender_id, message_text, created_at
    FROM case_messages
    WHERE deleted_at IS NULL
    ORDER BY created_at DESC
    LIMIT 200
  `;
  const [rows] = await pool.promise().query(query);
  return rows || [];
};

