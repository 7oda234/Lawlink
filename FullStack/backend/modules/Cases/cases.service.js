import db from "../../db/Connection.js";

const runQuery = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });

// 1️⃣ إنشاء قضية جديدة (CREATE) - [كود قديم]
export const createCase = async (data) => {
  const sql = `INSERT INTO cases (title, category, description, client_id, status) VALUES (?, ?, ?, ?, 'Pending')`;
  const res = await runQuery(sql, [data.title, data.category, data.description, data.client_id]);
  return { ok: true, caseId: res.insertId };
};

// 2️⃣ العميل بيبعت القضية لمحامي - [محدث]
export const sendOffer = async (caseId, lawyerId) => {
  const sql = `UPDATE cases SET lawyer_id = ?, status = 'Pending' WHERE case_id = ?`;
  await runQuery(sql, [lawyerId, caseId]);
  return { ok: true, message: "تم إرسال القضية للمحامي بانتظار رده ⚖️" };
};

// 3️⃣ المحامي بيرد على القضية ويحدد أتعابه - [كود جديد]
export const lawyerRespondToOffer = async (caseId, lawyerId, response, upfrontFee, successPercentage) => {
  if (response.toLowerCase() === 'accept') {
    // المحامي وافق وحدد فلوسه -> الحالة بقت في انتظار موافقة العميل
    const sql = `UPDATE cases SET upfront_fee = ?, success_percentage = ?, status = 'Awaiting_Client_Approval' WHERE case_id = ? AND lawyer_id = ?`;
    await runQuery(sql, [upfrontFee, successPercentage, caseId, lawyerId]);
    return { ok: true, message: "تم قبول القضية وتحديد الأتعاب.. في انتظار موافقة العميل ⏳" };
  } else {
    // المحامي رفض -> نشيل اسمه وترجع القضية للبحث
    const sql = `UPDATE cases SET lawyer_id = NULL, status = 'Pending' WHERE case_id = ?`;
    await runQuery(sql, [caseId]);
    return { ok: true, message: "تم رفض القضية وإعادتها للبحث ❌" };
  }
};

// 4️⃣ العميل بيرد على تسعيرة المحامي - [كود جديد]
export const clientRespondToFees = async (caseId, response) => {
  if (response.toLowerCase() === 'accept') {
    // العميل وافق على الفلوس -> الحالة بقت في انتظار الدفع
    const sql = `UPDATE cases SET status = 'Awaiting_Payment' WHERE case_id = ?`;
    await runQuery(sql, [caseId]);
    return { ok: true, message: "تمت الموافقة على أتعاب المحامي.. القضية الآن في انتظار الدفع المبدئي 💳" };
  } else {
    // العميل رفض الفلوس -> نشيل المحامي ونشيل الفلوس وترجع القضية Pending
    const sql = `UPDATE cases SET lawyer_id = NULL, upfront_fee = NULL, success_percentage = NULL, status = 'Pending' WHERE case_id = ?`;
    await runQuery(sql, [caseId]);
    return { ok: true, message: "تم رفض عرض المحامي المالي وإعادة القضية للبحث 🔄" };
  }
};

// 5️⃣ جلب كل القضايا النشطة (READ) - [كود قديم]
export const getCases = async () => {
  // بنجيب بس اللي متمسحش (deleted_at IS NULL)
  const sql = `SELECT * FROM cases WHERE deleted_at IS NULL`;
  return await runQuery(sql);
};

// 6️⃣ مسح قضية (DELETE - Soft Delete) - [كود قديم]
export const deleteCase = async (caseId) => {
  // بدل ما نمسح السطر، بنحدث وقت الحذف عشان الداتا تفضل موجودة للـ Admin
  const sql = `UPDATE cases SET deleted_at = NOW() WHERE case_id = ?`;
  await runQuery(sql, [caseId]);
  return { ok: true, message: "تم نقل القضية للأرشيف بنجاح 🗑️" };
};