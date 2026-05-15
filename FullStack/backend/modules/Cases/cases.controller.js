import * as casesService from "./cases.service.js";
import * as documentService from "../Document_folder/document_folder.service.js"; 
// ✅ استيراد دالة إنشاء الإشعار من موديول الإشعارات
import { createNotification } from "../Notification/notification.controller.js"; 

// ➕ إنشاء قضية مع حفظ الملفات المرفوعة
export const handleCreateCase = async (req, res) => {
  try {
    // 1. إنشاء القضية الأساسية
    const result = await casesService.createCase(req.body);
    const newCaseId = result.caseId; 

    // 2. التحقق من وجود ملفات وحفظها في الداتا بيز
    if (req.files && req.files.length > 0) {
      const clientId = req.body.client_id; 
      
      for (const file of req.files) {
        const filePath = `/uploads/${file.filename}`; 
        await documentService.addDocument(filePath, clientId, newCaseId); 
      }
    }

    // 🔔 إشعار للعميل بإنشاء القضية
    if (req.body.client_id) {
        await createNotification(req.body.client_id, "تم إنشاء قضيتك ورفع الملفات بنجاح 📁");
    }

    res.status(201).json({ 
        ok: true, 
        caseId: newCaseId, 
        message: "تم إنشاء القضية ورفع الملفات بنجاح 📁" 
    });
  } catch (err) {
    console.error("Error creating case:", err);
    res.status(500).json({ ok: false, message: err.message });
  }
};

// 📖 جلب كل القضايا
export const handleGetCases = async (req, res) => {
  try {
    const cases = await casesService.getCases();
    res.status(200).json({ ok: true, cases });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// 📩 1. العميل يرسل القضية للمحامي
export const handleSendOffer = async (req, res) => {
  try {
    const { caseId, lawyerId } = req.body;
    const result = await casesService.sendOffer(caseId, lawyerId);
    
    // 🔔 إشعار للمحامي بوجود قضية جديدة معروضة عليه
    if (lawyerId) {
        await createNotification(lawyerId, "لديك طلب قضية جديد في انتظار المراجعة 📩");
    }
    
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// 👨‍⚖️ 2. رد المحامي (تسعير)
export const handleLawyerResponse = async (req, res) => {
  try {
    const { caseId, lawyerId, response, upfrontFee, successPercentage } = req.body;
    const result = await casesService.lawyerRespondToOffer(caseId, lawyerId, response, upfrontFee, successPercentage);
    
    // 🔔 إشعار للعميل إن المحامي رد على القضية
    try {
        const caseDetails = await casesService.getCaseById(caseId);
        if (caseDetails && caseDetails.client_id) {
            if (response.toLowerCase() === 'accept') {
                await createNotification(caseDetails.client_id, "وافق المحامي على قضيتك وأرسل لك عرض الأتعاب لمراجعته ⚖️");
            } else {
                await createNotification(caseDetails.client_id, "نعتذر، المحامي رفض استلام القضية في الوقت الحالي ❌");
            }
        }
    } catch (notifErr) { console.error("Notification Error:", notifErr); }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// 👤 3. رد العميل (قبول التسعير)
export const handleClientResponse = async (req, res) => {
  try {
    const { caseId, response } = req.body;
    const result = await casesService.clientRespondToFees(caseId, response);
    
    // 🔔 إشعار للمحامي برد العميل على العرض
    try {
        const caseDetails = await casesService.getCaseById(caseId);
        if (caseDetails && caseDetails.lawyer_id) {
            if (response.toLowerCase() === 'accept') {
                await createNotification(caseDetails.lawyer_id, "وافق العميل على عرض الأتعاب الخاص بك، القضية في انتظار إتمام الدفع ⏳");
            } else {
                await createNotification(caseDetails.lawyer_id, "رفض العميل عرض الأتعاب الخاص بك وتمت إعادة القضية للبحث 🔄");
            }
        }
    } catch (notifErr) { console.error("Notification Error:", notifErr); }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// 🗑️ مسح قضية
export const handleDeleteCase = async (req, res) => {
  try {
    const { id } = req.params; 
    const result = await casesService.deleteCase(id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// 🔍 جلب تفاصيل قضية واحدة
export const handleGetCaseById = async (req, res) => {
  try {
    const { id } = req.params;
    const caseData = await casesService.getCaseById(id);
    if (!caseData) {
      return res.status(404).json({ ok: false, message: 'القضية غير موجودة.' });
    }
    res.status(200).json({ ok: true, data: caseData });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// تحديث حالة أو بيانات قضية
export const handleUpdateCase = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await casesService.updateCase(id, req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// 💳 4. تأكيد الدفع
export const handlePaymentConfirmation = async (req, res) => {
  try {
    const { caseId } = req.body;
    const result = await casesService.confirmPayment(caseId);
    
    // 🔔 إشعار للمحامي بأن العميل أتم الدفع
    try {
        const caseDetails = await casesService.getCaseById(caseId);
        if (caseDetails && caseDetails.lawyer_id) {
            await createNotification(caseDetails.lawyer_id, `تم تأكيد الدفع من قبل العميل لقضية رقم #${caseId}. يمكنك البدء في العمل الآن 💳`);
        }
    } catch (notifErr) { console.error("Notification Error:", notifErr); }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};