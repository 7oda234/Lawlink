import db from "../../db/Connection.js";

const runQuery = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });

export const getInstallmentsByCaseId = async (caseId) => {
  const sql = `SELECT * FROM installments WHERE case_id = ? ORDER BY created_at ASC`;
  const res = await runQuery(sql, [caseId]);
  return res;
};

export const getLawyerIdByCase = async (caseId) => {
  const sql = `SELECT lawyer_id FROM cases WHERE case_id = ?`;
  const res = await runQuery(sql, [caseId]);
  return res.length ? res[0].lawyer_id : null;
};

export const payInstallmentById = async ({ installmentId, payerClientId, paymentStatus }) => {
  const connection = await db.promise().getConnection();
  try {
    await connection.beginTransaction();

    const installmentSql = `
      SELECT i.*, c.client_id
      FROM installments i
      JOIN cases c ON c.case_id = i.case_id
      WHERE i.installment_id = ?
      LIMIT 1
    `;
    const [rows] = await connection.query(installmentSql, [installmentId]);
    if (!rows.length) throw new Error("Installment not found");
    const inst = rows[0];

    const clientId = payerClientId ?? inst.client_id;
    if (!clientId) throw new Error("Client id not found for this installment");

    if (inst.status === "Paid") {
      throw new Error("Installment already paid");
    }

    const remaining = Math.max(0, Number(inst.amount) - Number(inst.amount_paid ?? 0));
    if (remaining <= 0) {
      await connection.query(`UPDATE installments SET status='Paid' WHERE installment_id=?`, [installmentId]);
      await connection.commit();
      return { ok: true, installmentId, amountPaid: 0, status: "Paid" };
    }

    const insertStatus = paymentStatus || "Installment";
    const paymentInsertSql = `
      INSERT INTO payment (status, currency, amount, client_id, case_id)
      VALUES (?, 'EGP', ?, ?, ?)
    `;
    const [paymentResult] = await connection.query(paymentInsertSql, [insertStatus, remaining, clientId, inst.case_id]);
    const paymentId = paymentResult.insertId;

    const invoiceNumber = `INV-${Date.now()}`;
    await connection.query(
      `INSERT INTO invoices (invoice_number, issue_date, payment_id) VALUES (?, CURDATE(), ?)`,
      [invoiceNumber, paymentId]
    );

    const [lawyerRows] = await connection.query(`SELECT lawyer_id FROM cases WHERE case_id = ?`, [inst.case_id]);
    const lawyerId = lawyerRows.length ? lawyerRows[0].lawyer_id : null;

    if (lawyerId) {
      await connection.query(
        `
        INSERT INTO wallet (user_id, balance, currency)
        VALUES (?, ?, 'EGP')
        ON DUPLICATE KEY UPDATE balance = balance + ?
      `,
        [lawyerId, remaining, remaining]
      );
    }

    const newAmountPaid = Number(inst.amount_paid ?? 0) + remaining;
    const newStatus = newAmountPaid >= Number(inst.amount) ? "Paid" : "Partial";

    await connection.query(
      `UPDATE installments SET amount_paid = ?, status = ?, paid_at = NOW() WHERE installment_id = ?`,
      [newAmountPaid, newStatus, installmentId]
    );

    await connection.query(`UPDATE cases SET status='Ongoing' WHERE case_id = ?`, [inst.case_id]);

    await connection.commit();
    return {
      ok: true,
      installmentId,
      paymentId, 
      invoiceNumber,
      amountPaid: remaining,
      status: newStatus,
      caseId: inst.case_id,
    };
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
};

export const createInstallmentPlan = async (caseId, totalAmount, months) => {
  const connection = await db.promise().getConnection();
  try {
    await connection.beginTransaction();
    const amountPerMonth = totalAmount / months;
    const queries = [];

    for (let i = 0; i < months; i++) {
      const dueDate = new Date();
      dueDate.setMonth(dueDate.getMonth() + i);

      const sql = `INSERT INTO installments (case_id, amount, amount_paid, status, due_date) VALUES (?, ?, 0, 'Pending', ?)`;
      queries.push(connection.query(sql, [caseId, amountPerMonth, dueDate]));
    }

    await Promise.all(queries);
    await connection.commit();
    return { ok: true, message: "تم إنشاء خطة الأقساط بنجاح" };
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
};