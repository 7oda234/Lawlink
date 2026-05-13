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
    res.status(200).json(cases);
  } catch (error) {
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
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAIUsageLogs = async (req, res) => {
  try {
    const logs = await adminService.getAIUsageLogs();
    res.status(200).json(logs);
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
