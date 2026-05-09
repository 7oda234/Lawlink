import pool from '../db/Connection.js'; // تأكد إن المسار بيطلع برا فولدر middleware ويروح لـ config

export const activityLogger = async (req, res, next) => {
    res.on('finish', async () => {
        const userId = req.user?.user_id || req.user?.id || req.body?.user_id || null;
        const action = `${req.method} ${req.originalUrl}`;

        try {
            await pool.query(
                'INSERT INTO activity_log (user_id, action) VALUES (?, ?)',
                [userId, action]
            );
            console.log(`📝 Logged action: ${action}${userId ? ` for user ${userId}` : ''}`);
        } catch (err) {
            console.error('❌ Activity Log Error:', err.message);
        }
    });
    next();
};
