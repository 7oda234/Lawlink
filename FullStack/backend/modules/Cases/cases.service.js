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

// 2️⃣ إرسال عرض لمحامي محدد
export const sendOffer = async (caseId, lawyerId) => {
  const sql = `UPDATE cases SET lawyer_id = ?, status = 'Pending' WHERE case_id = ?`;
  await runQuery(sql, [parseInt(lawyerId), parseInt(caseId)]);
  return { ok: true, message: "تم إرسال القضية للمحامي بنجاح" };
};

// 3️⃣ رد المحامي (تحديث الأتعاب والحالة أوتوماتيكياً)
export const lawyerRespondToOffer = async (caseId, lawyerId, response, upfrontFee, successPercentage) => {
  if (response.toLowerCase() === 'accept') {
    // الكلمة التي سيقرأها الفرونت إند لتغيير الواجهة
    const status = 'Awaiting_Client_Approval'; 
    const sql = `UPDATE cases SET upfront_fee = ?, success_percentage = ?, status = ? WHERE case_id = ? AND lawyer_id = ?`;
    
    const res = await runQuery(sql, [
        parseFloat(upfrontFee) || 0, 
        parseFloat(successPercentage) || 0, 
        status,
        parseInt(caseId), 
        parseInt(lawyerId)
    ]);
    
    if (res.affectedRows === 0) throw new Error("فشل التحديث، تأكد من صحة رقم القضية.");
    return { ok: true, message: "تم قبول القضية وإرسال العرض المالي بنجاح ⏳" };
  } else {
    const sql = `UPDATE cases SET lawyer_id = NULL, status = 'Pending' WHERE case_id = ?`;
    await runQuery(sql, [parseInt(caseId)]);
    return { ok: true, message: "تم رفض القضية وإعادتها للبحث" };
  }
};

// 4️⃣ رد العميل (الموافقة على الأتعاب)
export const clientRespondToFees = async (caseId, response) => {
  if (response.toLowerCase() === 'accept') {
    const sql = `UPDATE cases SET status = 'Awaiting_Payment' WHERE case_id = ?`;
    await runQuery(sql, [parseInt(caseId)]);
    return { ok: true, message: "تمت الموافقة.. القضية في انتظار الدفع 💳" };
  } else {
    const sql = `UPDATE cases SET lawyer_id = NULL, upfront_fee = NULL, success_percentage = NULL, status = 'Pending' WHERE case_id = ?`;
    await runQuery(sql, [parseInt(caseId)]);
    return { ok: true, message: "تم رفض العرض المالي" };
  }
};

// 5️⃣ جلب كافة القضايا مع بيانات المحامي والعميل
export const getCases = async () => {
  const sql = `
    SELECT c.*, 
           lawyer.name AS lawyer_name, 
           lawyer.image_url AS lawyer_image,
           client.name AS client_name,
           client.image_url AS client_image
    FROM cases c
    LEFT JOIN users lawyer ON c.lawyer_id = lawyer.user_id
    LEFT JOIN users client ON c.client_id = client.user_id
    WHERE c.deleted_at IS NULL`;
  return await runQuery(sql);
};

export const getCaseById = async (caseId) => {
  const sql = `
    SELECT c.*, 
           lawyer.name AS lawyer_name, 
           lawyer.image_url AS lawyer_image,
           client.name AS client_name,
           client.image_url AS client_image
    FROM cases c
    LEFT JOIN users lawyer ON c.lawyer_id = lawyer.user_id
    LEFT JOIN users client ON c.client_id = client.user_id
    WHERE c.case_id = ? AND c.deleted_at IS NULL`;
  const rows = await runQuery(sql, [caseId]);
  return rows[0] || null;
};

export const updateCase = async (caseId, data) => {
  const fields = [];
  const params = [];

  if (data.title !== undefined) {
    fields.push('title = ?');
    params.push(data.title);
  }
  if (data.category !== undefined) {
    fields.push('category = ?');
    params.push(data.category);
  }
  if (data.description !== undefined) {
    fields.push('description = ?');
    params.push(data.description);
  }
  if (data.status !== undefined) {
    fields.push('status = ?');
    params.push(data.status);
  }
  if (data.client_id !== undefined) {
    fields.push('client_id = ?');
    params.push(data.client_id);
  }
  if (data.lawyer_id !== undefined) {
    fields.push('lawyer_id = ?');
    params.push(data.lawyer_id);
  }
  if (data.deadline !== undefined) {
    fields.push('deadline = ?');
    params.push(data.deadline);
  }
  if (data.urgency !== undefined) {
    fields.push('urgency = ?');
    params.push(data.urgency);
  }
  if (data.upfront_fee !== undefined) {
    fields.push('upfront_fee = ?');
    params.push(data.upfront_fee);
  }
  if (data.success_percentage !== undefined) {
    fields.push('success_percentage = ?');
    params.push(data.success_percentage);
  }

  if (fields.length === 0) {
    throw new Error('لا توجد بيانات لتحديثها.');
  }

  params.push(caseId);
  const sql = `UPDATE cases SET ${fields.join(', ')} WHERE case_id = ?`;
  const result = await runQuery(sql, params);
  if (result.affectedRows === 0) {
    throw new Error('القضية غير موجودة أو لم يتم تحديثها.');
  }
  return { ok: true, message: 'تم تحديث بيانات القضية بنجاح.' };
};

export const updateCaseStatus = async (caseId, status) => {
  const sql = `UPDATE cases SET status = ? WHERE case_id = ?`;
  const result = await runQuery(sql, [status, caseId]);
  if (result.affectedRows === 0) {
    throw new Error('القضية غير موجودة أو لم يتم تحديثها.');
  }
  return { ok: true, message: 'تم تحديث حالة القضية بنجاح.' };
};
