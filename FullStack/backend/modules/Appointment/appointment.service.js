import db from "../../db/Connection.js";

const runQuery = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });

// 1. التحقق من ربط المحامي بالقضية
export const verifyLawyerCaseLink = async (caseId, lawyerId) => {
  const sql = `SELECT * FROM cases WHERE case_id = ? AND lawyer_id = ?`;
  const res = await runQuery(sql, [caseId, lawyerId]);
  return res.length > 0;
};

// 2. إنشاء ميعاد جديد
export const createAppointment = async (date, clientId, lawyerId, caseId) => {
  const sql = `INSERT INTO appointment (appointment_date, status, client_id, lawyer_id, case_id) VALUES (?, 'Scheduled', ?, ?, ?)`;
  const res = await runQuery(sql, [date, clientId, lawyerId, caseId]);
  return res.insertId;
};

// 3. جلب المواعيد + اسم الطرف الآخر (العميل/المحامي) + اسم القضية
export const getAppointmentsByUser = async (userId, role) => {
  const isLawyer = role.toLowerCase() === 'lawyer';
  const column = isLawyer ? 'lawyer_id' : 'client_id';
  const joinColumn = isLawyer ? 'client_id' : 'lawyer_id'; 

  const sql = `
    SELECT 
        a.*, 
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

// 4. تعديل ميعاد
export const updateAppointment = async (appointmentId, newDate, newStatus) => {
  const sql = `UPDATE appointment SET appointment_date = ?, status = ? WHERE appointment_id = ?`;
  const res = await runQuery(sql, [newDate, newStatus, appointmentId]);
  return res.affectedRows > 0;
};

// 5. حذف ميعاد
export const deleteAppointment = async (appointmentId) => {
  const sql = `DELETE FROM appointment WHERE appointment_id = ?`;
  const res = await runQuery(sql, [appointmentId]);
  return res.affectedRows > 0;
};

// 6. جلب بيانات ميعاد محدد (لإرسال الإشعارات عند التعديل)
export const getAppointmentById = async (appointmentId) => {
  const sql = `SELECT * FROM appointment WHERE appointment_id = ?`;
  const res = await runQuery(sql, [appointmentId]);
  return res.length > 0 ? res[0] : null;
};