import * as casesService from "./cases.service.js";
import * as documentService from "../Document_folder/document_folder.service.js"; // 👈 استيراد ملف المستندات

// ➕ إنشاء قضية مع حفظ الملفات المرفوعة
export const handleCreateCase = async (req, res) => {
  try {
    // 1. إنشاء القضية الأساسية
    const result = await casesService.createCase(req.body);
    const newCaseId = result.caseId; 

    // 2. التحقق من وجود ملفات وحفظها في الداتا بيز
    // multer بيحط الملفات في req.files
    if (req.files && req.files.length > 0) {
      const clientId = req.body.client_id; 
      
      for (const file of req.files) {
        const filePath = `/uploads/${file.filename}`; 
        await documentService.addDocument(filePath, clientId, newCaseId); 
      }
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

// 💳 4. تأكيد الدفع
export const handlePaymentConfirmation = async (req, res) => {
  try {
    const { caseId } = req.body;
    const result = await casesService.confirmPayment(caseId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};