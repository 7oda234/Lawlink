import db from '../../db/Connection.js'; // المسار الصحيح لملف الاتصال

/**
 * ⚙️ دالة مساعدة لضمان تشغيل الاستعلام بنظام الـ Promises
 * متوافقة تماماً مع إعدادات قاعدة البيانات في مشروع LawLink
 */
const runQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// 📝 دالة تسجيل النشاطات بنجاح في الداتا بيز
export const logActivity = async (userId, action) => {
  try {
    const sql = `INSERT INTO activity_log (user_id, action, created_at) VALUES (?, ?, NOW())`;
    
    // ✅ الآن الاستعلام هيتنفذ ويهندل الـ await بشكل سليم مية في المية
    await runQuery(sql, [userId, action]); 
    
    console.log(`✅ [Activity Log]: تم تسجيل حركة للمستخدم (${userId}) بنجاح -> ${action}`);
  } catch (err) {
    console.error("❌ [Activity Log Error]: فشل تسجيل الحركة في قاعدة البيانات:", err.message);
  }
};