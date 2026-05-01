import * as documentsService from "./document_folder.service.js";
import fs from "fs"; // مكتبة التعامل مع الملفات المدمجة في Node.js

// 📤 1. رفع مستند جديد
export const handleUploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ ok: false, message: "لم يتم اختيار ملف لرفعه!" });
    }

    const filePath = req.file.path;
    const { userId, caseId } = req.body;

    if (!userId || !caseId) {
       fs.unlinkSync(filePath); // مسح الملف المرفوع لأن البيانات ناقصة
       return res.status(400).json({ ok: false, message: "يجب إرسال userId و caseId" });
    }

    // 🔐 التحقق من الصلاحيات: هل المستخدم هو محامي أو عميل هذه القضية؟
    const hasAccess = await documentsService.checkCaseAccess(userId, caseId);
    if (!hasAccess) {
      fs.unlinkSync(filePath); // مسح الملف فوراً من السيرفر
      return res.status(403).json({ ok: false, message: "غير مصرح لك بإضافة مستندات لهذه القضية ⛔" });
    }

    const result = await documentsService.addDocument(filePath, userId, caseId);
    res.status(201).json(result);
  } catch (err) {
    if (req.file) fs.unlinkSync(req.file.path);
    res.status(500).json({ ok: false, message: err.message });
  }
};

// 📖 2. جلب مستندات قضية معينة
export const handleGetCaseDocuments = async (req, res) => {
  try {
    const { caseId } = req.params;
    const documents = await documentsService.getDocumentsByCaseId(caseId);
    res.status(200).json({ ok: true, documents });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// 🔄 3. تعديل/تحديث مستند بملف جديد
export const handleUpdateDocument = async (req, res) => {
  try {
    const { id } = req.params; // ID المستند
    const { userId } = req.body; // اليوزر اللي بيحاول يعدل
    
    if (!req.file) {
      return res.status(400).json({ ok: false, message: "يجب اختيار ملف جديد للتعديل!" });
    }

    const newFilePath = req.file.path;

    if (!userId) {
      fs.unlinkSync(newFilePath);
      return res.status(400).json({ ok: false, message: "يجب إرسال userId للتحقق من الصلاحية" });
    }

    const document = await documentsService.getDocumentById(id);
    if (!document) {
      fs.unlinkSync(newFilePath);
      return res.status(404).json({ ok: false, message: "المستند غير موجود" });
    }

    // 🔐 التحقق من الصلاحيات باستخدام الـ case_id الخاص بالمستند
    const hasAccess = await documentsService.checkCaseAccess(userId, document.case_id);
    if (!hasAccess) {
      fs.unlinkSync(newFilePath);
      return res.status(403).json({ ok: false, message: "غير مصرح لك بتعديل مستندات هذه القضية ⛔" });
    }
    
    // (اختياري): ممكن تمسح الملف القديم من السيرفر هنا باستخدام fs.unlinkSync(document.file_path)

    const result = await documentsService.updateDocument(id, newFilePath);
    res.status(200).json(result);
  } catch (err) {
    if (req.file) fs.unlinkSync(req.file.path);
    res.status(500).json({ ok: false, message: err.message });
  }
};

// 🗑️ 4. مسح مستند
export const handleDeleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body; // اليوزر اللي بيحاول يمسح (هتتبعت في الـ Body حتى مع الـ DELETE)

    if (!userId) {
      return res.status(400).json({ ok: false, message: "يجب إرسال userId للتحقق من الصلاحية" });
    }

    const document = await documentsService.getDocumentById(id);
    if (!document) {
      return res.status(404).json({ ok: false, message: "المستند غير موجود" });
    }

    // 🔐 التحقق من الصلاحيات
    const hasAccess = await documentsService.checkCaseAccess(userId, document.case_id);
    if (!hasAccess) {
      return res.status(403).json({ ok: false, message: "غير مصرح لك بحذف مستندات هذه القضية ⛔" });
    }

    // (اختياري): مسح الملف الفعلي من السيرفر
    // if (fs.existsSync(document.file_path)) fs.unlinkSync(document.file_path);

    const result = await documentsService.deleteDocument(id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};