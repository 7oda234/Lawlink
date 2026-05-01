import db from "../../db/Connection.js";

const runQuery = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });

// 1. جلب ID المحامي الخاص بالقضية
export const getLawyerIdByCase = async (caseId) => {
  const sql = `SELECT lawyer_id FROM cases WHERE case_id = ?`;
  const res = await runQuery(sql, [caseId]);
  return res.length > 0 ? res[0].lawyer_id : null;
};

// 2. تسجيل الدفعة الأساسية في جدول payment
export const createPaymentEntry = async (amount, clientId, caseId, status = 'Partial') => {
  const sql = `INSERT INTO payment (status, currency, amount, client_id, case_id) VALUES (?, 'EGP', ?, ?, ?)`;
  const res = await runQuery(sql, [status, amount, clientId, caseId]);
  return res.insertId; 
};

// 3. إضافة رصيد للمحفظة (إنشاء محفظة لو مش موجودة)
export const addMoneyToWallet = async (userId, amount) => {
  const sql = `
    INSERT INTO wallet (user_id, balance, currency) 
    VALUES (?, ?, 'EGP') 
    ON DUPLICATE KEY UPDATE balance = balance + ?`;
  return await runQuery(sql, [userId, amount, amount]);
};

// 4. تسجيل الأقساط
export const createInstallment = async (paymentId, remainingAmount, dueDate) => {
  const sql = `INSERT INTO installment (payment_id, amount, due_date, status) VALUES (?, ?, ?, 'Pending')`;
  return await runQuery(sql, [paymentId, remainingAmount, dueDate]);
};

// 5. تفعيل القضية
export const activateCase = async (caseId) => {
  const sql = `UPDATE cases SET status = 'Ongoing' WHERE case_id = ?`;
  return await runQuery(sql, [caseId]);
};

// 6. سحب الأموال من المحفظة (لأي مستخدم)
export const withdrawFromWallet = async (userId, amountToWithdraw) => {
  const sql = `UPDATE wallet SET balance = balance - ? WHERE user_id = ? AND balance >= ?`;
  const res = await runQuery(sql, [amountToWithdraw, userId, amountToWithdraw]);
  return res.affectedRows > 0; 
};

// 7. جلب تفاصيل القسط
export const getInstallmentDetails = async (installmentId) => {
  const sql = `
    SELECT i.amount, i.status, p.payment_id, p.case_id, c.lawyer_id
    FROM installment i
    JOIN payment p ON i.payment_id = p.payment_id
    JOIN cases c ON p.case_id = c.case_id
    WHERE i.installment_id = ?
  `;
  const res = await runQuery(sql, [installmentId]);
  return res.length > 0 ? res[0] : null;
};

// 8. دفع القسط
export const payInstallment = async (installmentId) => {
  const sql = `UPDATE installment SET status = 'Paid', paid_at = CURRENT_TIMESTAMP WHERE installment_id = ?`;
  return await runQuery(sql, [installmentId]);
};

// 9. الاستعلام عن الرصيد
export const getWalletBalance = async (userId) => {
  const sql = `SELECT balance, currency FROM wallet WHERE user_id = ?`;
  const res = await runQuery(sql, [userId]);
  return res.length > 0 ? res[0] : null; 
};

// 10. تنفيذ Refund تبادلي (خصم من طرف وإيداع لطرف آخر)
export const processRefundTransaction = async (paymentId, fromUserId, toUserId, refundAmount) => {
  // أ- خصم من المصدر
  const sqlDebit = `UPDATE wallet SET balance = balance - ? WHERE user_id = ? AND balance >= ?`;
  const debitRes = await runQuery(sqlDebit, [refundAmount, fromUserId, refundAmount]);

  if (debitRes.affectedRows === 0) return false; 

  // ب- إيداع للمستقبل
  await addMoneyToWallet(toUserId, refundAmount); 

  // ج- تحديث حالة الدفعة
  const sqlPayment = `UPDATE payment SET status = 'Refunded' WHERE payment_id = ?`;
  await runQuery(sqlPayment, [paymentId]);

  return true;
};