import db from "../../db/Connection.js";

const runQuery = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) {
        console.error(`🔴 SQL Error: ${err.sqlMessage || err.message}`);
        return reject(err);
      }
      resolve(result);
    });
  });

export const verifyLawyerCaseLink = async (caseId, lawyerId) => {
  const sql = `SELECT * FROM cases WHERE case_id = ? AND lawyer_id = ?`;
  const res = await runQuery(sql, [caseId, lawyerId]);
  return res.length > 0;
};

export const createAppointment = async (date, clientId, lawyerId, caseId) => {
  const sql = `INSERT INTO appointment (appointment_date, status, client_id, lawyer_id, case_id) VALUES (?, 'Scheduled', ?, ?, ?)`;
  const res = await runQuery(sql, [date, clientId, lawyerId, caseId]);
  return res.insertId;
};

// 🔥 الحل السحري هنا: استخدمنا DATE_FORMAT عشان الداتابيز ترجع النص سليم 100% 
export const getAppointmentsByUser = async (userId, role) => {
  const isLawyer = role.toLowerCase() === 'lawyer';
  const column = isLawyer ? 'lawyer_id' : 'client_id';
  const joinColumn = isLawyer ? 'client_id' : 'lawyer_id'; 

  const sql = `
    SELECT 
        a.appointment_id, 
        a.status, 
        a.client_id, 
        a.lawyer_id, 
        a.case_id,
        DATE_FORMAT(a.appointment_date, '%Y-%m-%dT%H:%i') AS appointment_date,
        u.name AS partner_name, 
        u.image_url AS partner_image,
        c.title AS case_title
    FROM appointment a
    JOIN users u ON a.${joinColumn} = u.user_id
    LEFT JOIN cases c ON a.case_id = c.case_id
    WHERE a.${column} = ? 
    ORDER BY a.appointment_date ASC`;

  return await runQuery(sql, [userId]);
};

// ✅ منعنا ظهور خطأ لو اليوزر داس تعديل ومغيرش حاجة
export const updateAppointment = async (appointmentId, newDate, newStatus) => {
  const sql = `UPDATE appointment SET appointment_date = ?, status = ? WHERE appointment_id = ?`;
  const res = await runQuery(sql, [newDate, newStatus, appointmentId]);
  return res !== null; 
};

export const deleteAppointment = async (appointmentId) => {
  const sql = `DELETE FROM appointment WHERE appointment_id = ?`;
  const res = await runQuery(sql, [appointmentId]);
  return res.affectedRows > 0;
};

export const getAppointmentById = async (appointmentId) => {
  const sql = `SELECT * FROM appointment WHERE appointment_id = ?`;
  const res = await runQuery(sql, [appointmentId]);
  return res.length > 0 ? res[0] : null;
};