import dotenv from 'dotenv';
dotenv.config();
import { bootstrap } from './App.js'; 
import pool from './db/Connection.js'; // 👈 استورد الـ Pool اللي عملناه بـ createPool
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        // 1. اختبار الاتصال بالـ Pool (مش مجرد connection واحد)
        const connection = await pool.getConnection();
        console.log('✅ MariaDB Connected Successfully on Port 3307!');
        connection.release(); // بنسيب الخط مفتوح للـ Pool بس بنرجعه للخدمة

        // 2. تشغيل الـ Express App
        const app = bootstrap(); 

        app.listen(PORT, () => {
            console.log(`🚀 LawLink Server is running on: http://localhost:${PORT}`);
        });

    } catch (err) {
        console.error('❌ Server failed to start:', err.message);
        // لو الداتابيز مش شغالة، السيرفر مش هيقوم وده الصح
        process.exit(1);
    }
};

startServer();