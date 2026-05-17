import db from '../../db/Connection.js'; // تأكد أن مسار ملف قاعدة البيانات صحيح

/**
 * دالة مساعدة لضمان عمل الاستعلام بشكل سليم 
 * تتعامل تلقائياً مع الـ Callback والـ Promises لتجنب أخطاء (TypeError / Undefined)
 */
const runQuery = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        if (db.promise) {
            db.promise().query(sql, params)
                .then(([rows]) => resolve(rows))
                .catch(err => reject(err));
        } else {
            db.query(sql, params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        }
    });
};

// =========================================================
// 📥 دالة جلب جميع سجلات النظام (Audit Logs)
// =========================================================
export const getAllLogs = async (req, res) => {
    try {
        // 💡 تنبيه هام بخصوص الخطأ الشائع:
        // إذا كان المعرف الأساسي في جدول `users` لديك يسمى `id` وليس `user_id`،
        // يجب عليك تغيير `users.user_id` في السطر التالي إلى `users.id`
        
        const sql = `
            SELECT activity_log.*, users.name as user_name 
            FROM activity_log 
            LEFT JOIN users ON activity_log.user_id = users.user_id 
            ORDER BY activity_log.created_at DESC
        `;

        const rows = await runQuery(sql);

        // إرسال البيانات بشكل صحيح للـ Frontend
        return res.status(200).json({ 
            success: true, 
            data: rows 
        });
        
    } catch (err) {
        console.error("❌ Error fetching Audit Logs:", err.message);
        
        // إرسال رسالة الخطأ لتظهر في הـ Frontend في حال وجود مشكلة في الداتابيز
        return res.status(500).json({ 
            success: false, 
            message: "حدث خطأ أثناء جلب السجلات: " + err.message 
        });
    }
};
