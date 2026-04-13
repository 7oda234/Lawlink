import db from "../../db/Connection.js";

const runQuery = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });

// 1️⃣ إنشاء قضية جديدة (CREATE)
export const createCase = async (data) => {
  const sql = `INSERT INTO cases (title, category, description, client_id, status) VALUES (?, ?, ?, ?, 'Pending')`;
  const res = await runQuery(sql, [data.title, data.category, data.description, data.client_id]);
  return { ok: true, caseId: res.insertId };
};

// 2️⃣ إرسال عرض (تحديث مبدئي للمحامي)
export const sendOffer = async (caseId, lawyerId) => {
  const sql = `UPDATE cases SET lawyer_id = ?, status = 'Pending' WHERE case_id = ?`;
  await runQuery(sql, [lawyerId, caseId]);
  return { ok: true, message: "تم إرسال العرض للمحامي بنجاح" };
};

// 3️⃣ الرد على العرض (Accept / Reject)
export const respondToOffer = async (caseId, lawyerId, response) => {
  if (response.toLowerCase() === 'accept') {
    const sql = `UPDATE cases SET status = 'Ongoing', lawyer_id = ? WHERE case_id = ?`;
    await runQuery(sql, [lawyerId, caseId]);
    return { ok: true, message: "تمت الموافقة.. القضية الآن قيد التنفيذ مع المحامي ⚖️" };
  } else {
    const sql = `UPDATE cases SET lawyer_id = NULL, status = 'Pending' WHERE case_id = ?`;
    await runQuery(sql, [caseId]);
    return { ok: true, message: "تم رفض العرض وإعادة القضية للبحث" };
  }
};

// 4️⃣ جلب كل القضايا النشطة (READ)
export const getCases = async () => {
  // بنجيب بس اللي متمسحش (deleted_at IS NULL)
  const sql = `SELECT * FROM cases WHERE deleted_at IS NULL`;
  return await runQuery(sql);
};

// 5️⃣ مسح قضية (DELETE - Soft Delete)
export const deleteCase = async (caseId) => {
  // بدل ما نمسح السطر، بنحدث وقت الحذف عشان الداتا تفضل موجودة للـ Admin
  const sql = `UPDATE cases SET deleted_at = NOW() WHERE case_id = ?`;
  await runQuery(sql, [caseId]);
  return { ok: true, message: "تم نقل القضية للأرشيف بنجاح 🗑️" };
};