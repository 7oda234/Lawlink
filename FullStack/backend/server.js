import dotenv from 'dotenv';
dotenv.config(); 

import http from 'http'; 
import { bootstrap } from './App.js'; 
import pool from './db/Connection.js'; 
import connectMongoDB from './db/Mongo.js'; 
import { initializeChatSocket } from './Sockets/chat Socket.js';
import { registerAdminMonitoringSocketHandlers } from './Sockets/adminMonitoring Socket.js';
import { startMonitoringEngine } from './modules/admin_case_monitoring/monitoring.engine.js';


const PORT = process.env.PORT || 5000;


/**
 * دالة تشغيل السيرفر الأساسية
 * تقوم بالتأكد من اتصال قواعد البيانات قبل بدء استقبال الطلبات
 */
const startServer = async () => {
    try {
        console.log('⏳ جاري تشغيل سيرفر وفحص الاتصالات...');

        // 1. فحص اتصال MariaDB (البيانات الأساسية)
        // نستخدم promise() لضمان انتظار الاتصال قبل المتابعة
        const promisePool = pool.promise(); 
        const connection = await promisePool.getConnection();
        console.log('✅ MariaDB (Relational DB) Connected Successfully!');
        if (connection) connection.release(); 

        // 2. تشغيل اتصال MongoDB (نظام المحادثات)
        await connectMongoDB();

        // 3. تحضير تطبيق Express الأساسي
        const app = bootstrap(); 
        
        // 4. إنشاء خادم HTTP
        // ضروري جداً استخدام http.createServer لدمج Express مع Socket.io في نفس البورت
        const server = http.createServer(app);

        // 5. تشغيل نظام المحادثات اللحظية (WebSockets)
        const io = initializeChatSocket(server);

        // Attach admin monitoring room handlers to the same Socket.IO instance
        registerAdminMonitoringSocketHandlers();

        // جعل الـ io متاحاً بشكل عالمي في المشروع إذا احتجت لإرسال إشعارات من الـ Controllers
        global.io = io;

        // Start monitoring engine (Phase 5)
        startMonitoringEngine();

        if (!global.io) {
            throw new Error('Socket.IO instance not found: expected global.io to be initialized.');
        }




        // 6. بدء الاستماع للطلبات على البورت المحدد
        server.listen(PORT, () => {
            console.log(`🚀 Server is running on: http://localhost:${PORT}`);
            console.log(`💬 Real-time Chat Service is active and ready.`);
            console.log(`📝 Environment variables loaded successfully.`);
        });

    } catch (err) {
        console.error('❌ خطأ فادح: فشل في تشغيل السيرفر أو الاتصال بقواعد البيانات:');
        console.error(err.message);
        // إنهاء العملية في حالة فشل الاتصال بقواعد البيانات لضمان سلامة النظام
        process.exit(1);
    }
};

// تشغيل السيرفر
startServer();
