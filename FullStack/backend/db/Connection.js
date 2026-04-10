// src/db/Connection.js
import mysql from 'mysql2';

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'lawlink',
    port: 3307,
    waitForConnections: true,    // 👈 مهم جداً عشان ما يعلقش
    connectionLimit: 10,         // أقصى عدد اتصالات
    queueLimit: 0,
    connectTimeout: 10000        // لو ما اتصلش في 10 ثواني يفصل ويدي Error بدل الـ Pending
});

// اختبار فوري للاتصال أول ما السيرفر يقوم
pool.getConnection((err, connection) => {
    if (err) {
        console.error("❌ Database Connection Failed:", err.message);
    } else {
        console.log("✅ Database Connected and Ready for LawLink Queries!");
        connection.release();
    }
});

export default pool;
