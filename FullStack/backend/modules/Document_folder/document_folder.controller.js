import * as documentsService from "./document_folder.service.js";
import fs from "fs";
// ✅ استيراد دوال الإشعارات والقضايا
import { createNotification } from "../Notification/notification.controller.js";
import * as casesService from "../Cases/cases.service.js";

export const handleUploadDocument = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ ok: false, message: "لم يتم اختيار ملف لرفعه!" });
    }

    const { userId, caseId } = req.body;

    if (!userId || !caseId) {
       req.files.forEach(file => fs.unlinkSync(file.path)); 
       return res.status(400).json({ ok: false, message: "يجب إرسال userId و caseId" });
    }

    const hasAccess = await documentsService.checkCaseAccess(userId, caseId);
    if (!hasAccess) {
      req.files.forEach(file => fs.unlinkSync(file.path));
      return res.status(403).json({ ok: false, message: "غير مصرح لك بإضافة مستندات لهذه القضية ⛔" });
    }

    const uploadPromises = req.files.map(file => 
      documentsService.addDocument(file.path, userId, caseId)
    );
    
    const results = await Promise.all(uploadPromises);

    // 🔔 إرسال إشعار للطرف الآخر (المحامي أو العميل) برفع مستند جديد
    try {
      const caseData = await casesService.getCaseById(caseId);
      if (caseData) {
        // نحدد الطرف التاني اللي هيتبعتله الإشعار بناءً على مين اللي رفع الملف
        const targetUserId = parseInt(userId) === caseData.client_id ? caseData.lawyer_id : caseData.client_id;
        if (targetUserId) {
          await createNotification(targetUserId, `تم رفع مستندات جديدة في قضية رقم #${caseId} 📁`);
        }
      }
    } catch (notifErr) {
      console.error("⚠️ Notification Error:", notifErr.message);
    }

    res.status(201).json({ ok: true, message: "تم رفع المستندات بنجاح 📁", results });
  } catch (err) {
    if (req.files) req.files.forEach(file => fs.unlinkSync(file.path));
    res.status(500).json({ ok: false, message: err.message });
  }
};

export const handleGetCaseDocuments = async (req, res) => {
  try {
    const { caseId } = req.params;
    const documents = await documentsService.getDocumentsByCaseId(caseId);
    res.status(200).json({ ok: true, documents });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

export const handleUpdateDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    if (!req.file) return res.status(400).json({ ok: false, message: "يجب اختيار ملف جديد!" });

    const newFilePath = req.file.path;
    const document = await documentsService.getDocumentById(id);
    
    if (!document || !(await documentsService.checkCaseAccess(userId, document.case_id))) {
      fs.unlinkSync(newFilePath);
      return res.status(403).json({ ok: false, message: "غير مصرح لك أو المستند غير موجود" });
    }

    const result = await documentsService.updateDocument(id, newFilePath);
    res.status(200).json(result);
  } catch (err) {
    if (req.file) fs.unlinkSync(req.file.path);
    res.status(500).json({ ok: false, message: err.message });
  }
};

export const handleDeleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const document = await documentsService.getDocumentById(id);
    
    if (document && (await documentsService.checkCaseAccess(userId, document.case_id))) {
      const result = await documentsService.deleteDocument(id);
      return res.status(200).json(result);
    }
    res.status(403).json({ ok: false, message: "غير مصرح لك بالحذف" });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};