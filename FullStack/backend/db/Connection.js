import mysql from 'mysql2/promise'; // 👈 لازم mysql2 والـ promise

// إعداد الـ Pool (عشان نقدر نستخدم الـ Transactions والـ getConnection)
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "lawlink",
  port: 3307,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// اختبار الاتصال عند بداية التشغيل
pool.getConnection()
    .then(conn => {
        console.log("✅ MariaDB (LawLink) Connected Successfully on Port 3307!");
        conn.release();
    })
    .catch(err => {
        console.error("❌ Database Connection Failed:", err.message);
    });

export default pool; // 👈 تصدير الـ pool عشان الـ Service يشوفه