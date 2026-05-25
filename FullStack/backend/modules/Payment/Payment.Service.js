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

export const createPaymentEntry = async (amount, clientId, caseId, status = 'Full') => {
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
  const invoiceNumber = `INV-${Date.now()}`;
  
  const sql = `INSERT INTO invoices (invoice_number, issue_date, payment_id) VALUES (?, CURDATE(), ?)`;
  try {
    await runQuery(sql, [invoiceNumber, paymentId]);
  } catch (e) {
    console.error("Error creating invoice: ", e);
  }

  return { ok: true, invoiceNumber, paymentId };
};

export const getInvoiceDetails = async (paymentId) => {
  const sql = `
    SELECT p.*, i.invoice_number, i.issue_date 
    FROM payment p
    LEFT JOIN invoices i ON p.payment_id = i.payment_id
    WHERE p.payment_id = ?
  `;
  const res = await runQuery(sql, [paymentId]);
  return res.length > 0 ? res[0] : null;
};

export const getPaymentHistory = async (clientId) => {
  const sql = `SELECT * FROM payment WHERE client_id = ? ORDER BY created_at DESC`;
  const res = await runQuery(sql, [clientId]);
  return res;
};

export const getWalletBalance = async (userId) => {
  const sql = `SELECT balance FROM wallet WHERE user_id = ?`;
  const res = await runQuery(sql, [userId]);
  return res.length > 0 ? res[0].balance : 0;
};

export const getLawyerPaymentHistory = async (lawyerId) => {
  try {
    const sql = `
      SELECT p.payment_id, p.amount, p.created_at, p.status, 
             u.name as client_name, c.title as case_title, 'income' as type
      FROM payment p
      JOIN cases c ON p.case_id = c.case_id
      JOIN users u ON p.client_id = u.user_id 
      WHERE c.lawyer_id = ?
      ORDER BY p.created_at DESC
    `;
    return await runQuery(sql, [lawyerId]);
  } catch (err) {
    console.error("🔥 SQL Database Error in getLawyerPaymentHistory:", err.sqlMessage || err.message);
    throw err;
  }
};

export const getClientPaymentHistory = async (clientId) => {
  try {
    const sql = `
      SELECT p.payment_id, p.amount, p.created_at, p.status, 
             u.name as lawyer_name, c.title as case_title, 'expense' as type
      FROM payment p
      JOIN cases c ON p.case_id = c.case_id
      JOIN users u ON c.lawyer_id = u.user_id 
      WHERE p.client_id = ?
      ORDER BY p.created_at DESC
    `;
    return await runQuery(sql, [clientId]);
  } catch (err) {
    console.error("🔥 SQL Database Error in getClientPaymentHistory:", err.sqlMessage || err.message);
    throw err;
  }
};

// 👇 الدوال الجديدة الخاصة بمعالجة اشتراكات المحامين
export const processSubscriptionPayment = async (lawyerId, planId, totalAmount, paidAmount, paymentType, months) => {
  const connection = await db.promise().getConnection();
  try {
    await connection.beginTransaction();

    // 1. تسجيل العملية في جدول الدفع (كمصروفات من المحامي للمنصة)
    // وضعنا case_id = NULL لأن هذا اشتراك وليس قضية
    const paymentStatus = paymentType === 'full' ? 'Paid' : 'Partial';
    const paymentSql = `INSERT INTO payment (status, currency, amount, client_id, case_id) VALUES (?, 'EGP', ?, ?, NULL)`;
    const [paymentResult] = await connection.query(paymentSql, [paymentStatus, paidAmount, lawyerId]);
    const paymentId = paymentResult.insertId;

    // 2. إصدار الفاتورة لهذه العملية
    const invoiceNumber = `INV-SUB-${Date.now()}`;
    const invoiceSql = `INSERT INTO invoices (invoice_number, issue_date, payment_id) VALUES (?, CURDATE(), ?)`;
    await connection.query(invoiceSql, [invoiceNumber, paymentId]);

    // 3. لو الدفع تقسيط، هنولد جدول الأقساط للمحامي
    if (paymentType === 'installment') {
      const amountPerMonth = totalAmount / months;
      const queries = [];

      for (let i = 0; i < months; i++) {
        const dueDate = new Date();
        dueDate.setMonth(dueDate.getMonth() + i);
        
        const isFirstInstallment = (i === 0);
        const instStatus = isFirstInstallment ? 'Paid' : 'Pending';
        const instPaid = isFirstInstallment ? amountPerMonth : 0;

        // استخدمنا case_id = NULL لأنها أقساط اشتراك
        const instSql = `INSERT INTO installments (case_id, amount, amount_paid, status, due_date) VALUES (NULL, ?, ?, ?, ?)`;
        queries.push(connection.query(instSql, [amountPerMonth, instPaid, instStatus, dueDate]));
      }

      await Promise.all(queries);
    }

    await connection.commit();
    return { paymentId, invoiceNumber };
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
};