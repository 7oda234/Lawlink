import mysql from 'mysql2/promise'; // استخدم mysql2 والـ promise

// إنشاء الـ Pool ببياناتك اللي بعتها
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', // سيبها فاضية لو xampp
    database: 'lawlink',
    port: 3307,   // البورت اللي أنت أكدت عليه
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// اختبار الاتصال فوراً
const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log("✅ MariaDB (LawLink) Connected Successfully on Port 3307!");
        connection.release();
    } catch (err) {
        console.error("❌ Database Connection Error:", err.message);
    }
};

testConnection();

export default pool;