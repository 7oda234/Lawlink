import db from "../../db/Connection.js";

const runQuery = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });

// 1. جلب القضايا الجارية للمحامي
export const getOngoingCases = async (lawyerId) => {
  const sql = `
    SELECT case_id, title, client_id, status, created_at 
    FROM cases 
    WHERE lawyer_id = ? AND status = 'Ongoing'
    ORDER BY created_at DESC
  `;
  const result = await runQuery(sql, [parseInt(lawyerId)]);
  return { ok: true, data: result };
};

// 2. إضافة جلسة جديدة (+ تحديث وقت تعديل القضية)
export const createSession = async (data) => {
  const checkSql = `SELECT status FROM cases WHERE case_id = ?`;
  const caseData = await runQuery(checkSql, [parseInt(data.case_id)]);
  
  if (caseData.length === 0 || caseData[0].status !== 'Ongoing') {
    throw new Error("لا يمكن إضافة جلسات إلا للقضايا الجارية (Ongoing) فقط.");
  }

  const sql = `
    INSERT INTO court_sessions (case_id, session_date, court_name, hall_number, status) 
    VALUES (?, ?, ?, ?, 'Scheduled')
  `;
  const res = await runQuery(sql, [data.case_id, data.session_date, data.court_name, data.hall_number || null]);
  
  const updateCaseSql = `UPDATE cases SET updated_at = CURRENT_TIMESTAMP WHERE case_id = ?`;
  await runQuery(updateCaseSql, [parseInt(data.case_id)]);

  return { ok: true, sessionId: res.insertId, message: "تم تسجيل موعد الجلسة بنجاح 📅" };
};

// 3. تعديل بيانات الجلسة
export const editSessionDetails = async (data) => {
  const { session_id, session_date, court_name, hall_number } = data;
  const sql = `
    UPDATE court_sessions 
    SET 
      session_date = COALESCE(?, session_date), 
      court_name = COALESCE(?, court_name), 
      hall_number = COALESCE(?, hall_number) 
    WHERE session_id = ? AND status = 'Scheduled'
  `;
  const result = await runQuery(sql, [
    session_date || null, 
    court_name || null, 
    hall_number || null, 
    parseInt(session_id)
  ]);
  if (result.affectedRows === 0) throw new Error("فشل التعديل.");
  return { ok: true, message: "تم تحديث البيانات بنجاح ✏️" };
};

// 4. تحديث النتيجة وإغلاق القضية
export const updateSessionResult = async (data) => {
  const { session_id, case_id, decision_type, session_decision } = data;
  const updateSessionSql = `
    UPDATE court_sessions 
    SET status = 'Completed', decision_type = ?, session_decision = ? 
    WHERE session_id = ?
  `;
  await runQuery(updateSessionSql, [decision_type, session_decision, parseInt(session_id)]);

  if (decision_type === 'Final_Verdict') {
    const closeCaseSql = `UPDATE cases SET status = 'Closed', updated_at = CURRENT_TIMESTAMP WHERE case_id = ?`;
    await runQuery(closeCaseSql, [parseInt(case_id)]);
    return { ok: true, message: "تم تسجيل الحكم النهائي وإغلاق القضية بنجاح ⚖️" };
  } else {
    const updateCaseTimeSql = `UPDATE cases SET updated_at = CURRENT_TIMESTAMP WHERE case_id = ?`;
    await runQuery(updateCaseTimeSql, [parseInt(case_id)]);
  }
  return { ok: true, message: "تم تسجيل نتيجة الجلسة 🔄" };
};

// 5. جلب جميع الجلسات لقضية معينة
export const getSessionsByCaseId = async (caseId) => {
  const sql = `SELECT * FROM court_sessions WHERE case_id = ? ORDER BY session_date DESC`;
  const result = await runQuery(sql, [parseInt(caseId)]);
  return { ok: true, data: result };
};

// 6. ⚖️ جلب قرار المحكمة (الإضافة المطلوبة)
export const getCaseDecision = async (caseId) => {
  // نجلب آخر جلسة تم الانتهاء منها وصدر فيها قرار
  const sql = `
    SELECT decision_type, session_decision, session_date 
    FROM court_sessions 
    WHERE case_id = ? AND status = 'Completed' AND session_decision IS NOT NULL
    ORDER BY (decision_type = 'Final_Verdict') DESC, session_date DESC 
    LIMIT 1
  `;
  const result = await runQuery(sql, [parseInt(caseId)]);
  
  if (result.length === 0) {
    return { ok: true, data: null, message: "لم يصدر قرار بعد." };
  }
  return { ok: true, data: result[0] };
};