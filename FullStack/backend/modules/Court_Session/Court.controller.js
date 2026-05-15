import * as courtSessionService from "./Court.service.js";
// ✅ استيراد دالة الإشعارات وخدمات القضايا عشان نجيب الـ ID بتاع العميل
import { createNotification } from "../Notification/notification.controller.js";
import * as casesService from "../Cases/cases.service.js";

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
    
    // 🔔 إشعار للعميل بتحديد موعد جلسة المحكمة
    try {
        const caseDetails = await casesService.getCaseById(req.body.case_id);
        if (caseDetails && caseDetails.client_id) {
            await createNotification(caseDetails.client_id, `تم تحديد موعد جلسة محكمة جديدة لقضيتك يوم ${req.body.session_date} 🏛️`);
        }
    } catch (notifErr) { console.error("Notification Error:", notifErr); }

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
    
    // 🔔 إشعار للعميل بكتابة قرار المحكمة أو الحكم النهائي
    try {
        const caseDetails = await casesService.getCaseById(req.body.case_id);
        if (caseDetails && caseDetails.client_id) {
            const msg = req.body.decision_type === 'Final_Verdict' 
                ? `تم إصدار الحكم النهائي في قضيتك وإغلاق الملف ⚖️`
                : `تم تحديث قرار المحكمة لجلسة قضيتك الحالية 🔄`;
            await createNotification(caseDetails.client_id, msg);
        }
    } catch (notifErr) { console.error("Notification Error:", notifErr); }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

export const handleGetSessionsByCaseId = async (req, res) => {
  try {
    const { caseId } = req.params;
    const result = await courtSessionService.getSessionsByCaseId(caseId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

export const handleGetCaseDecision = async (req, res) => {
  try {
    const { caseId } = req.params;
    const result = await courtSessionService.getCaseDecision(caseId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};