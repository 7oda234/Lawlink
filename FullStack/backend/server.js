// 1. استدعاء مكتبة البيئة (لازم تكون أول سطر)
import dotenv from 'dotenv';
dotenv.config(); 

// 2. استدعاء المكتبات الأساسية
import { bootstrap } from './App.js'; 
import pool from './db/Connection.js'; 

// 3. تحديد البورت من الـ .env أو افتراضي 5000
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        console.log('⏳ جاري فحص الاتصال بالبيانات...');

        // 4. اختبار الاتصال بقاعدة البيانات (MariaDB/MySQL)
        const connection = await pool.getConnection();
        console.log('✅ MariaDB (LawLink) Connected Successfully on Port 3307!');
        connection.release(); // إعادة الخط للـ Pool بعد التأكد من الاتصال

        // 5. تشغيل تطبيق Express (الـ Routes والميدلوير)
        const app = bootstrap(); 

        // 6. فتح السيرفر للاستماع للطلبات
        app.listen(PORT, () => {
            console.log(`🚀 LawLink Server is running on: http://localhost:${PORT}`);
            console.log(`📝 Environment loaded: (${Object.keys(process.env).filter(k => !k.startsWith('NODE')).length}) variables detected.`);
        });

    } catch (err) {
        console.error('❌ فشل في تشغيل السيرفر:', err.message);
        // لو الداتابيز فيها مشكلة، السيرفر مش هيقوم عشان نصلح العيب فوراً
        process.exit(1);
    }
};

// تشغيل المحرك
startServer();