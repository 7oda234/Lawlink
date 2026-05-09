import db from '../../db/Connection.js'; // تأكد إن المسار صح

export const logActivity = async (userId, action) => {
  try {
    // ✅ دلوقت تقدر تستخدم await مباشرة من غير دالة runQuery ومن غير إيرورات
    const sql = `INSERT INTO activity_log (user_id, action, created_at) VALUES (?, ?, NOW())`;
    await db.query(sql, [userId, action]); 
    console.log("✅ Activity Logged Successfully");
  } catch (err) {
    console.error("❌ Activity Log Error:", err.message);
  }
};