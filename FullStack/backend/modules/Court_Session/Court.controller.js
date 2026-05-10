import * as courtSessionService from "./Court.service.js";

export const handleGetOngoingCases = async (req, res) => {
  try {
    const lawyerId = req.body.lawyer_id || (req.user && req.user.user_id);
    const result = await courtSessionService.getOngoingCases(lawyerId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

export const handleCreateSession = async (req, res) => {
  try {
    const result = await courtSessionService.createSession(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

export const handleEditSession = async (req, res) => {
  try {
    const result = await courtSessionService.editSessionDetails(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

export const handleUpdateResult = async (req, res) => {
  try {
    const result = await courtSessionService.updateSessionResult(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// 👈 الدالة التي تسبب الخطأ (يجب أن تكون موجودة هنا)
export const handleGetSessionsByCaseId = async (req, res) => {
  try {
    const { caseId } = req.params;
    const result = await courtSessionService.getSessionsByCaseId(caseId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// 👈 ودالة القرار أيضاً
export const handleGetCaseDecision = async (req, res) => {
  try {
    const { caseId } = req.params;
    const result = await courtSessionService.getCaseDecision(caseId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};