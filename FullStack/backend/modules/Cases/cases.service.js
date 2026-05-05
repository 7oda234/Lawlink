import db from "../../db/Connection.js";

const runQuery = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });

// 1️⃣ إنشاء قضية جديدة
export const createCase = async (data) => {
  const sql = `INSERT INTO cases (title, category, description, client_id, status) VALUES (?, ?, ?, ?, 'Pending')`;
  const res = await runQuery(sql, [data.title, data.category, data.description, data.client_id]);
  return { ok: true, caseId: res.insertId };
};

// 2️⃣ العميل بيبعت القضية لمحامي
export const sendOffer = async (caseId, lawyerId) => {
  const sql = `UPDATE cases SET lawyer_id = ?, status = 'Pending' WHERE case_id = ?`;
  await runQuery(sql, [lawyerId, caseId]);
  return { ok: true, message: "تم إرسال القضية للمحامي بانتظار رده ⚖️" };
};

// 3️⃣ المحامي بيرد على القضية
export const lawyerRespondToOffer = async (caseId, lawyerId, response, upfrontFee, successPercentage) => {
  if (response.toLowerCase() === 'accept') {
    const sql = `UPDATE cases SET upfront_fee = ?, success_percentage = ?, status = 'Awaiting_Client_Approval' WHERE case_id = ? AND lawyer_id = ?`;
    await runQuery(sql, [upfrontFee, successPercentage, caseId, lawyerId]);
    return { ok: true, message: "تم قبول القضية وتحديد الأتعاب.. في انتظار موافقة العميل ⏳" };
  } else {
    const sql = `UPDATE cases SET lawyer_id = NULL, status = 'Pending' WHERE case_id = ?`;
    await runQuery(sql, [caseId]);
    return { ok: true, message: "تم رفض القضية وإعادتها للبحث ❌" };
  }
};

// 4️⃣ العميل بيرد على تسعيرة المحامي
export const clientRespondToFees = async (caseId, response) => {
  if (response.toLowerCase() === 'accept') {
    const sql = `UPDATE cases SET status = 'Awaiting_Payment' WHERE case_id = ?`;
    await runQuery(sql, [caseId]);
    return { ok: true, message: "تمت الموافقة على أتعاب المحامي.. القضية الآن في انتظار الدفع المبدئي 💳" };
  } else {
    const sql = `UPDATE cases SET lawyer_id = NULL, upfront_fee = NULL, success_percentage = NULL, status = 'Pending' WHERE case_id = ?`;
    await runQuery(sql, [caseId]);
    return { ok: true, message: "تم رفض عرض المحامي المالي وإعادة القضية للبحث 🔄" };
  }
};

// 5️⃣ جلب القضايا (نسخة آمنة بدون صورة لمنع الخطأ)
export const getCases = async () => {
  const sql = `
    SELECT c.*, 
           lawyer.name AS lawyer_name, 
           client.name AS client_name 
    FROM cases c
    LEFT JOIN users lawyer ON c.lawyer_id = lawyer.user_id
    LEFT JOIN users client ON c.client_id = client.user_id
    WHERE c.deleted_at IS NULL
  `;
  return await runQuery(sql);
};

// 6️⃣ مسح قضية
export const deleteCase = async (caseId) => {
  const sql = `UPDATE cases SET deleted_at = NOW() WHERE case_id = ?`;
  await runQuery(sql, [caseId]);
  return { ok: true, message: "تم نقل القضية للأرشيف بنجاح 🗑️" };
};

// 7️⃣ 🔥 التحديث الجديد: تأكيد دفع العميل وتغيير الحالة لـ In_Progress
export const confirmPayment = async (caseId) => {
  const sql = `UPDATE cases SET status = 'In_Progress' WHERE case_id = ?`;
  await runQuery(sql, [caseId]);
  return { ok: true, message: "تم تأكيد الدفع وتحويل القضية للعمل بنجاح 🚀" };
};