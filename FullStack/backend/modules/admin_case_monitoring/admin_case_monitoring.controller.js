import * as service from './admin_case_monitoring.service.js';

const sendError = (res, error, status = 500) => {
  res.status(status).json({ success: false, message: error?.message || 'Internal server error' });
};

export const getCases = async (req, res) => {
  try {
    const { page, pageSize, q, status, priority, category, dateFrom, dateTo, sortBy, sortDir } = req.query;

    const data = await service.listCases({
      page: page ? Number(page) : undefined,
      pageSize: pageSize ? Number(pageSize) : undefined,
      q,
      status,
      priority,
      category,
      dateFrom,
      dateTo,
      sortBy,
      sortDir,
    });

    res.status(200).json({ success: true, data: data.rows, meta: data.meta });
  } catch (e) {
    sendError(res, e);
  }
};

export const getCaseById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await service.getCaseById(Number(id));
    res.status(200).json({ success: true, data });
  } catch (e) {
    sendError(res, e);
  }
};

export const getCaseDocuments = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await service.getCaseDocuments(Number(id));
    res.status(200).json({ success: true, data });
  } catch (e) {
    sendError(res, e);
  }
};

export const getCaseHearings = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await service.getCaseHearings(Number(id));
    res.status(200).json({ success: true, data });
  } catch (e) {
    sendError(res, e);
  }
};

export const getCaseMessages = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await service.getCaseMessages(Number(id));
    res.status(200).json({ success: true, data });
  } catch (e) {
    sendError(res, e);
  }
};

export const getCaseAnalytics = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await service.getCaseAnalytics(Number(id));
    res.status(200).json({ success: true, data });
  } catch (e) {
    sendError(res, e);
  }
};


export const getCasesStats = async (req, res) => {
  try {
    const data = await service.getCasesStats(req.query);
    res.status(200).json({ success: true, data });
  } catch (e) {
    sendError(res, e);
  }
};

export const getCasesAnalytics = async (req, res) => {
  try {
    const data = await service.getCasesAnalytics(req.query);
    res.status(200).json({ success: true, data });
  } catch (e) {
    sendError(res, e);
  }
};

export const getCasesWorkload = async (req, res) => {
  try {
    const data = await service.getCasesWorkload(req.query);
    res.status(200).json({ success: true, data });
  } catch (e) {
    sendError(res, e);
  }
};

export const getCasesPerformance = async (req, res) => {
  try {
    const data = await service.getCasesPerformance(req.query);
    res.status(200).json({ success: true, data });
  } catch (e) {
    sendError(res, e);
  }
};

export const getCasesActivity = async (req, res) => {
  try {
    const { caseId, page, pageSize } = req.query;
    const data = await service.getCasesActivity({
      caseId: caseId ? Number(caseId) : undefined,
      page: page ? Number(page) : undefined,
      pageSize: pageSize ? Number(pageSize) : undefined,
    });
    res.status(200).json({ success: true, data: data.rows, meta: data.meta });
  } catch (e) {
    sendError(res, e);
  }
};

export const postCaseActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, text } = req.body;

    const data = await service.postCaseActivity(Number(id), { type, text, actorUserId: req.user?.userId });
    res.status(201).json({ success: true, data });
  } catch (e) {
    sendError(res, e);
  }
};

export const getCasesAlerts = async (req, res) => {
  try {
    const data = await service.getCasesAlerts(req.query);
    res.status(200).json({ success: true, data });
  } catch (e) {
    sendError(res, e);
  }
};

export const postCaseEscalate = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const data = await service.escalateCase(Number(id), { reason, actorUserId: req.user?.userId });
    res.status(201).json({ success: true, data });
  } catch (e) {
    sendError(res, e);
  }
};

export const putCaseStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const data = await service.updateCaseStatus(Number(id), { status, actorUserId: req.user?.userId });
    res.status(200).json({ success: true, data });
  } catch (e) {
    sendError(res, e);
  }
};

export const postCaseNotes = async (req, res) => {
  try {
    const { id } = req.params;
    const { notes } = req.body;

    const data = await service.postCaseNotes(Number(id), { notes, actorUserId: req.user?.userId });
    res.status(201).json({ success: true, data });
  } catch (e) {
    sendError(res, e);
  }
};

