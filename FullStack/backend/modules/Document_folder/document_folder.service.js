import db from "../../db/Connection.js";

const runQuery = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });

// 🔐 دالة للتحقق من صلاحية المستخدم (هل هو العميل أو المحامي الخاص بالقضية؟)
export const checkCaseAccess = async (userId, caseId) => {
  const sql = `SELECT client_id, lawyer_id FROM cases WHERE case_id = ?`;
  const result = await runQuery(sql, [caseId]);
  
  if (result.length === 0) return false; // القضية غير موجودة
  
  const caseData = result[0];
  // يرجع true لو اليوزر هو العميل أو هو المحامي اللي ماسك القضية
  return String(caseData.client_id) === String(userId) || String(caseData.lawyer_id) === String(userId);
};

// 🔍 دالة لجلب تفاصيل المستند (بنحتاجها قبل التعديل أو الحذف)
export const getDocumentById = async (documentId) => {
  const sql = `SELECT * FROM document WHERE document_id = ?`;
  const result = await runQuery(sql, [documentId]);
  return result.length > 0 ? result[0] : null;
};

// 1️⃣ إضافة مستند جديد
export const addDocument = async (filePath, userId, caseId) => {
  const sql = `INSERT INTO document (file_path, user_id, case_id) VALUES (?, ?, ?)`;
  const res = await runQuery(sql, [filePath, userId, caseId]);
  return { ok: true, documentId: res.insertId, message: "تم رفع المستند بنجاح 📁" };
};

// 2️⃣ جلب كل المستندات الخاصة بقضية معينة
export const getDocumentsByCaseId = async (caseId) => {
  const sql = `SELECT * FROM document WHERE case_id = ? ORDER BY created_at DESC`;
  return await runQuery(sql, [caseId]);
};

// 3️⃣ تعديل مستند (استبدال المسار القديم بمسار الملف الجديد)
export const updateDocument = async (documentId, newFilePath) => {
  const sql = `UPDATE document SET file_path = ? WHERE document_id = ?`;
  await runQuery(sql, [newFilePath, documentId]);
  return { ok: true, message: "تم تعديل المستند وإضافة الملف الجديد بنجاح 🔄" };
};

// 4️⃣ مسح مستند من قاعدة البيانات
export const deleteDocument = async (documentId) => {
  const sql = `DELETE FROM document WHERE document_id = ?`;
  await runQuery(sql, [documentId]);
  return { ok: true, message: "تم حذف المستند بنجاح 🗑️" };
};