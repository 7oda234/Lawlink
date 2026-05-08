import db from "../../db/Connection.js";

const runQuery = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });

// 1. إضافة إشعار جديد
export const createNotification = async (userId, message) => {
  const sql = `INSERT INTO notifications (user_id, message, is_read, created_at) VALUES (?, ?, false, NOW())`;
  const res = await runQuery(sql, [userId, message]);
  return res.insertId;
};

// 2. دالة مساعدة لجلب ID العميل من رقم القضية
export const getClientIdByCase = async (caseId) => {
  const sql = `SELECT client_id FROM cases WHERE case_id = ?`;
  const res = await runQuery(sql, [caseId]);
  return res.length > 0 ? res[0].client_id : null;
};

// 3. دالة مساعدة لجلب ID المحامي من رقم القضية
export const getLawyerIdByCase = async (caseId) => {
  const sql = `SELECT lawyer_id FROM cases WHERE case_id = ?`;
  const res = await runQuery(sql, [caseId]);
  return res.length > 0 ? res[0].lawyer_id : null;
};