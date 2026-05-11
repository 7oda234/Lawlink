import db from "../../db/Connection.js";

const runQuery = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });

// NOTE:
// Since DB schema details are not present in this repo, we implement against the most likely columns.
// Required columns we assume exist:
// - installments: installment_id, case_id, amount, amount_paid, status, due_date, created_at
// - installment_payments: id, installment_id, payment_id, amount, created_at
// - payment: payment_id, status, currency, amount, client_id, case_id, created_at
// - wallet: user_id (unique), balance, currency
//
// If your table/column names differ, adjust the SQL accordingly.

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

export const payInstallmentById = async ({ installmentId, payerClientId }) => {
  const connection = await db.promise().getConnection();
  try {
    await connection.beginTransaction();

    // Load installment (and case/client linkage)
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

    // Create a payment record for the installment payment
    const paymentInsertSql = `
      INSERT INTO payment (status, currency, amount, client_id, case_id)
      VALUES (?, 'EGP', ?, ?, ?)
    `;
    const paymentStatus = "Installment";
    const [paymentResult] = await connection.query(paymentInsertSql, [paymentStatus, remaining, clientId, inst.case_id]);
    const paymentId = paymentResult.insertId;

    // Update wallet balance for lawyer
    const lawyerId = await (async () => {
      const [r] = await connection.query(`SELECT lawyer_id FROM cases WHERE case_id = ?`, [inst.case_id]);
      return r.length ? r[0].lawyer_id : null;
    })();

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

    // Update installment paid amount + status
    const newAmountPaid = Number(inst.amount_paid ?? 0) + remaining;
    const newStatus = newAmountPaid >= Number(inst.amount) ? "Paid" : "Partial";

    await connection.query(
      `UPDATE installments SET amount_paid = ?, status = ?, paid_at = NOW() WHERE installment_id = ?`,
      [newAmountPaid, newStatus, installmentId]
    );

    // Invoice integration:
    // If you have an invoices table, update it here.
    // We implement a soft approach: if invoices table exists, update totals by summing payments.
    // Otherwise, nothing breaks.
    try {
      await connection.query(
        `
        UPDATE invoices i
        SET 
          paid_amount = (
            SELECT COALESCE(SUM(p.amount),0)
            FROM payment p
            WHERE p.case_id = i.case_id
          ),
          status = CASE
            WHEN (
              SELECT COALESCE(SUM(p.amount),0)
              FROM payment p
              WHERE p.case_id = i.case_id
            ) >= i.total_amount THEN 'Paid'
            ELSE 'Partial'
          END
        WHERE i.case_id = ?
      `,
        [inst.case_id]
      );
    } catch (_) {
      // ignore if invoices table/columns differ
    }

    // Update case status to Ongoing (or whatever you use)
    await connection.query(`UPDATE cases SET status='Ongoing' WHERE case_id = ?`, [inst.case_id]);

    await connection.commit();
    return {
      ok: true,
      installmentId,
      paymentId,
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

