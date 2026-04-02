import pool from '../db/Connection.js'; // تأكد إن المسار بيطلع برا فولدر middleware ويروح لـ config

export const activityLogger = async (req, res, next) => {
    // بنستنى لما الـ Response يخلص عشان نضمن إن العملية نجحت
    res.on('finish', async () => {
        // لو لسه مخلصتش الـ Auth، ممكن مؤقتاً تاخد الـ userId من الـ body للتيست
        const userId = (req.user && req.user.user_id) || (req.body && req.body.user_id) || null;
        const action = `${req.method} ${req.originalUrl}`;
        
        try {
            if (userId) {
                await pool.query(
                    'INSERT INTO activity_log (user_id, action) VALUES (?, ?)',
                    [userId, action]
                );
                console.log(`📝 Logged: ${action} for user ${userId}`);
            }
        } catch (err) {
            console.error('❌ Activity Log Error:', err.message);
        }
    });
    next();
};