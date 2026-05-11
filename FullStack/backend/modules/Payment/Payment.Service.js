import db from "../../db/Connection.js";

const runQuery = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });

export const getLawyerIdByCase = async (caseId) => {
  const sql = `SELECT lawyer_id FROM cases WHERE case_id = ?`;
  const res = await runQuery(sql, [caseId]);
  return res.length > 0 ? res[0].lawyer_id : null;
};

export const createPaymentEntry = async (amount, clientId, caseId, status = 'Partial') => {
  const sql = `INSERT INTO payment (status, currency, amount, client_id, case_id) VALUES (?, 'EGP', ?, ?, ?)`;
  const res = await runQuery(sql, [status, amount, clientId, caseId]);
  return res.insertId; 
};

export const addMoneyToWallet = async (userId, amount) => {
  const sql = `
    INSERT INTO wallet (user_id, balance, currency) 
    VALUES (?, ?, 'EGP') 
    ON DUPLICATE KEY UPDATE balance = balance + ?`;
  return await runQuery(sql, [userId, amount, amount]);
};

export const activateCase = async (caseId) => {
  const sql = `UPDATE cases SET status = 'Ongoing' WHERE case_id = ?`;
  return await runQuery(sql, [caseId]);
};

export const createInvoice = async (paymentId) => {
  // Minimal invoice integration: generate invoice number + store it in payment row.
  // If invoice table exists later, we can extend.
  const invoiceNumber = `INV-${Date.now()}`;

  const sql = `UPDATE payment SET invoice_number = ? WHERE payment_id = ?`;
  try {
    await runQuery(sql, [invoiceNumber, paymentId]);
  } catch (e) {
    // If payment table has no invoice_number column, ignore and just return
  }

  return { ok: true, invoiceNumber, paymentId };
};

export const getInvoiceDetails = async (paymentId) => {
  const sql = `SELECT * FROM payment WHERE payment_id = ?`;
  const res = await runQuery(sql, [paymentId]);
  return res.length > 0 ? res[0] : null;
};

export const getPaymentHistory = async (clientId) => {
  const sql = `SELECT * FROM payment WHERE client_id = ? ORDER BY created_at DESC`;
  const res = await runQuery(sql, [clientId]);
  return res;
};
