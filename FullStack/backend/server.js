import dotenv from 'dotenv';
dotenv.config(); 

import { bootstrap } from './App.js'; 
import pool from './db/Connection.js'; 

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        console.log('⏳ جاري فحص الاتصال بالبيانات...');

        // تعديل بسيط لضمان الحصول على الاتصال بشكل صحيح
        const promisePool = pool.promise(); 
        const connection = await promisePool.getConnection();
        
        console.log('✅ MariaDB (LawLink) Connected Successfully on Port 3307!');
        
        // التأكد من وجود الاتصال قبل عمل release
        if (connection) connection.release(); 

        const app = bootstrap(); 

        app.listen(PORT, () => {
            console.log(`🚀 LawLink Server is running on: http://localhost:${PORT}`);
            console.log(`📝 Environment loaded: (${Object.keys(process.env).length}) variables detected.`);
        });

    } catch (err) {
        console.error('❌ فشل في تشغيل السيرفر:', err.message);
        // لو الداتابيز فيها مشكلة، السيرفر مش هيقوم
        process.exit(1);
    }
};

startServer();
