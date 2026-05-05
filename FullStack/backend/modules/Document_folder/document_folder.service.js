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

export const addDocument = async (filePath, userId, caseId) => {
  const sql = `INSERT INTO document (file_path, user_id, case_id) VALUES (?, ?, ?)`;
  const res = await runQuery(sql, [filePath, userId, caseId]);
  return { ok: true, documentId: res.insertId };
};

export const getDocumentsByCaseId = async (caseId) => {
  const sql = `SELECT * FROM document WHERE case_id = ? ORDER BY created_at DESC`;
  return await runQuery(sql, [caseId]);
};

export const updateDocument = async (documentId, newFilePath) => {
  const sql = `UPDATE document SET file_path = ? WHERE document_id = ?`;
  await runQuery(sql, [newFilePath, documentId]);
  return { ok: true, message: "تم التحديث بنجاح 🔄" };
};

export const deleteDocument = async (documentId) => {
  const sql = `DELETE FROM document WHERE document_id = ?`;
  await runQuery(sql, [documentId]);
  return { ok: true, message: "تم الحذف بنجاح 🗑️" };
};