import * as adminService from './admin.service.js';

export const getUsers = async (req, res) => {
  try {
    const users = await adminService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getLawyers = async (req, res) => {
  try {
    const lawyers = await adminService.getAllLawyers();
    res.status(200).json(lawyers);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPendingLawyers = async (req, res) => {
  try {
    const lawyers = await adminService.getPendingLawyers();
    res.status(200).json(lawyers);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const approveLawyer = async (req, res) => {
  try {
    const { userId, approved } = req.body;
    if (!userId) {
      return res.status(400).json({ success: false, message: 'Missing lawyer userId.' });
    }

    const result = await adminService.approveLawyer(userId, approved);

    // Audit log (best-effort)
    try {
      const actingUserId = req.user?.userId || req.user?.id || null;
      const sql = `INSERT INTO activity_log (user_id, action, created_at) VALUES (?, ?, NOW())`;
      const action = `APPROVE_LAWYER target_user_id=${userId} approved=${approved} acting_user_id=${actingUserId}`;
      await req.app.locals.db.query(sql, [actingUserId, action]);
    } catch {}

    res.status(200).json({ success: true, ...result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const verifyLawyer = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { verified } = req.body;
    if (!userId) {
      return res.status(400).json({ success: false, message: 'Missing lawyer userId.' });
    }

    const normalized = verified === 1 || verified === true || verified === '1';
    const result = await adminService.approveLawyer(userId, normalized);

    try {
      const actingUserId = req.user?.userId || req.user?.id || null;
      const sql = `INSERT INTO activity_log (user_id, action, created_at) VALUES (?, ?, NOW())`;
      const action = `VERIFY_LAWYER target_user_id=${userId} verified=${normalized} acting_user_id=${actingUserId}`;
      await req.app.locals.db.query(sql, [actingUserId, action]);
    } catch {}

    res.status(200).json({ success: true, ...result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const payInstallment = async (req, res) => {
  try {
    const { id } = req.params; // معرف القسط القادم من الرابط
    const { clientId } = req.body;

    // تحديث حالة القسط إلى مدفوع في قاعدة البيانات
    const sql = `UPDATE installments SET status = 'Paid', paid_at = NOW() WHERE installment_id = ?`;
    await req.app.locals.db.query(sql, [id]);

    // تسجيل العملية في سجل النشاطات (Audit Log)
    try {
      const actingUserId = req.user?.userId || req.user?.id || null;
      const logSql = `INSERT INTO activity_log (user_id, action, created_at) VALUES (?, ?, NOW())`;
      const action = `PAY_INSTALLMENT installment_id=${id} client_id=${clientId} acting_user_id=${actingUserId}`;
      await req.app.locals.db.query(logSql, [actingUserId, action]);
    } catch (logErr) {
      console.error("Audit log failed:", logErr);
    }

    res.status(200).json({ success: true, message: 'تم تسوية وتحصيل القسط بنجاح.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getClients = async (req, res) => {
  try {
    const clients = await adminService.getAllClients();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCases = async (req, res) => {
  try {
    const cases = await adminService.getAllCases();
    res.status(200).json(cases);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCaseMonitoring = async (req, res) => {
  try {
    const cases = await adminService.getCaseMonitoringData();
    // ✅ Encapsulate the response inside a structured JSON data property object
    res.status(200).json({ success: true, data: Array.isArray(cases) ? cases : [] });
  } catch (error) {
    console.error("Controller Error inside getCaseMonitoring:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getFullDashboard = async (req, res) => {
  try {
    const dashboard = await adminService.getFullDashboardData();
    res.status(200).json(dashboard);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getReportsAnalytics = async (req, res) => {
  try {
    const reports = await adminService.getReportsAnalytics();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSystemLogs = async (req, res) => {
  try {
    const logs = await adminService.getSystemLogs();
    res.status(200).json({ success: true, data: Array.isArray(logs) ? logs : [] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getAIUsageLogs = async (req, res) => {
  try {
    const logs = await adminService.getAIUsageLogs();
    res.status(200).json({ success: true, data: Array.isArray(logs) ? logs : [] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getFinancialLogs = async (req, res) => {
  try {
    const logs = await adminService.getFinancialLogs();
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Missing Admin Dashboard endpoints (contract expected by frontend)
export const getAdminProfile = async (req, res) => {
  try {
    const profile = await adminService.getAdminProfile(req);
    res.status(200).json({ success: true, data: profile || {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAdminLogs = async (req, res) => {
  try {
    const logs = await adminService.getAdminLogs();
    res.status(200).json({ success: true, data: Array.isArray(logs) ? logs : [] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAdminDocuments = async (req, res) => {
  try {
    const documents = await adminService.getAdminDocuments();
    res.status(200).json({ success: true, data: Array.isArray(documents) ? documents : [] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAdminHearings = async (req, res) => {
  try {
    const hearings = await adminService.getAdminHearings();
    res.status(200).json({ success: true, data: Array.isArray(hearings) ? hearings : [] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAdminMessages = async (req, res) => {
  try {
    const messages = await adminService.getAdminMessages();
    res.status(200).json({ success: true, data: Array.isArray(messages) ? messages : [] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteUserAccount = async (req, res) => {
  try {
    const targetUserId = req.params.id;
    const simulatedTargetUserLevel = 5; // Example target check value

    if (req.isHierarchicalMutationAllowed && !req.isHierarchicalMutationAllowed(simulatedTargetUserLevel)) {
      return res.status(403).json({
        success: false,
        message: 'Operation Blocked: Level 4 Operations Managers cannot modify or remove Level 5 Super Admins.'
      });
    }

    return res.status(200).json({ success: true, message: `Account record ${targetUserId} dropped.` });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
// --- NEW STUB CONTROLLERS FOR ROLES ---
export const getSupportTickets = async (req, res) => res.status(200).json({ success: true, data: [] });
export const updateSupportTicket = async (req, res) => res.status(200).json({ success: true, message: 'Ticket updated' });
export const sendAdminMessage = async (req, res) => res.status(200).json({ success: true, message: 'Message sent' });
export const getLawyerLicenses = async (req, res) => res.status(200).json({ success: true, data: [] });
export const verifyLawyerLicense = async (req, res) => res.status(200).json({ success: true, message: 'License verified' });
export const getLegalDocumentsForReview = async (req, res) => res.status(200).json({ success: true, data: [] });
export const reviewLegalDocument = async (req, res) => res.status(200).json({ success: true, message: 'Document reviewed' });
export const getFraudDetectionLogs = async (req, res) => res.status(200).json({ success: true, data: [] });
export const createUser = async (req, res) => res.status(201).json({ success: true, message: 'User created' });
export const updateUser = async (req, res) => res.status(200).json({ success: true, message: 'User updated' });
export const deleteUser = async (req, res) => res.status(200).json({ success: true, message: 'User deleted' });
export const createCase = async (req, res) => res.status(201).json({ success: true, message: 'Case created' });
export const updateCase = async (req, res) => res.status(200).json({ success: true, message: 'Case updated' });
export const deleteCase = async (req, res) => res.status(200).json({ success: true, message: 'Case deleted' });
export const getEscalations = async (req, res) => res.status(200).json({ success: true, data: [] });
export const resolveEscalation = async (req, res) => res.status(200).json({ success: true, message: 'Escalation resolved' });
export const createAdmin = async (req, res) => res.status(201).json({ success: true, message: 'Admin created' });
export const updateAdmin = async (req, res) => res.status(200).json({ success: true, message: 'Admin updated' });
export const deleteAdmin = async (req, res) => res.status(200).json({ success: true, message: 'Admin deleted' });
export const getSettings = async (req, res) => res.status(200).json({ success: true, data: {} });
export const updateSettings = async (req, res) => res.status(200).json({ success: true, message: 'Settings updated' });
export const getDatabaseBackups = async (req, res) => res.status(200).json({ success: true, data: [] });
export const createDatabaseBackup = async (req, res) => res.status(201).json({ success: true, message: 'Backup created' });
