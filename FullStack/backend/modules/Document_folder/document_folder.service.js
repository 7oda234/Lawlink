import db from "../../db/Connection.js";

const runQuery = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });

export const checkCaseAccess = async (userId, caseId) => {
  const sql = `SELECT client_id, lawyer_id FROM cases WHERE case_id = ?`;
  const result = await runQuery(sql, [caseId]);
  if (result.length === 0) return false;
  const caseData = result[0];
  return String(caseData.client_id) === String(userId) || String(caseData.lawyer_id) === String(userId);
};

export const getDocumentById = async (documentId) => {
  const sql = `SELECT * FROM document WHERE document_id = ?`;
  const result = await runQuery(sql, [documentId]);
  return result.length > 0 ? result[0] : null;
};

// ✅ إضافة ملف وتحديث تاريخ القضية
export const addDocument = async (filePath, userId, caseId) => {
  // 1. إضافة الملف
  const sql = `INSERT INTO document (file_path, user_id, case_id) VALUES (?, ?, ?)`;
  const res = await runQuery(sql, [filePath, userId, caseId]);
  
  // 2. تحديث وقت القضية فوراً
  await runQuery(`UPDATE cases SET updated_at = CURRENT_TIMESTAMP WHERE case_id = ?`, [caseId]);
  
  return { ok: true, documentId: res.insertId };
};

export const getDocumentsByCaseId = async (caseId) => {
  const sql = `SELECT * FROM document WHERE case_id = ? ORDER BY created_at DESC`;
  return await runQuery(sql, [caseId]);
};

export const updateDocument = async (documentId, newFilePath) => {
  const sql = `UPDATE document SET file_path = ? WHERE document_id = ?`;
  await runQuery(sql, [newFilePath, documentId]);
  // تحديث الوقت أيضاً عند التعديل
  const doc = await getDocumentById(documentId);
  if(doc) await runQuery(`UPDATE cases SET updated_at = CURRENT_TIMESTAMP WHERE case_id = ?`, [doc.case_id]);
  
  return { ok: true, message: "تم التحديث بنجاح 🔄" };
};

// ✅ حذف ملف وتحديث تاريخ القضية
export const deleteDocument = async (documentId) => {
  // 1. جلب بيانات الملف لمعرفة الـ case_id قبل حذفه
  const doc = await getDocumentById(documentId);
  
  // 2. الحذف
  const sql = `DELETE FROM document WHERE document_id = ?`;
  await runQuery(sql, [documentId]);
  
  // 3. تحديث الوقت في جدول القضايا
  if (doc) {
      await runQuery(`UPDATE cases SET updated_at = CURRENT_TIMESTAMP WHERE case_id = ?`, [doc.case_id]);
  }
  return { ok: true, message: "تم الحذف بنجاح 🗑️" };
};