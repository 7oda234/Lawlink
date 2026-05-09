import db from '../db/Connection.js'; // اتأكد إن المسار لملف الـ Connection صح

export const activityLogger = async (req, res, next) => {
    // بناخد بيانات بسيطة عن الحركة اللي حصلت
    const { method, url, ip } = req;
    const userId = req.user?.id || null; // لو اليوزر عامل لوجن بناخد الـ ID بتاعه

    try {
        // ✅ بنستخدم try/catch عشان لو الداتابيز فيها مشكلة، السيرفر مايوقعش واليوزر يكمل عادي
        const sql = `INSERT INTO activity_log (user_id, action, ip_address) VALUES (?, ?, ?)`;
        
        // 🛡️ الحركة دي بتمنع الـ Loop: لو الـ db مش Promise بنشغله عادي، ولو Promise بنعمله await
        if (db.promise) {
            await db.promise().query(sql, [userId, `${method} ${url}`, ip]);
        } else {
            // لو إنت أصلاً معدل ملف الـ Connection ومخليه .promise()
            await db.query(sql, [userId, `${method} ${url}`, ip]);
        }
    } catch (err) {
        // 🤫 بنطبع رسالة بسيطة في السطر ده بدل ما نملى التيرمينال
        console.log("⚠️ Activity Log skipped due to DB configuration.");
    }

    next(); // 👈 السطر ده أهم حاجة عشان يخلي الطلب يكمل وما يوقفش السيرفر
};