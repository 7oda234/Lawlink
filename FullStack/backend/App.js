import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url'; // 👈 استيراد مهم جداً لمسارات ES Modules
import { activityLogger } from './middleware/audit.js';
import { setupAppRoutes } from './controllers/app.controller.js';

// ==========================================
// 📍 تحديد المسار المطلق للمشروع (أدق من process.cwd)
// ==========================================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const bootstrap = () => {
    const app = express();

    // ==========================================
    // ✅ الحل الجذري والنهائي لمسار الصور والملفات
    // ==========================================
    // السطر ده بيخلي السيرفر يفتح فولدر uploads للمتصفح عشان يعرض الصور والـ PDF
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

    // Middlewares الأساسية (الشغل القديم بتاعك)
    // قفلنا حماية الـ Cross-Origin للريسورسز عشان React يقدر يقرأ الـ PDF
    app.use(helmet({
        crossOriginResourcePolicy: false,
    }));
    
    // التعديل هنا: تم تحديد الـ Origin وتفعيل الـ Credentials لحل مشكلة الـ CORS في الـ Dashboard
    app.use(cors({
        origin: 'http://localhost:5173', 
        credentials: true,               
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));

    // السماح بالملفات الكبيرة
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ limit: '50mb', extended: true }));

    app.use(activityLogger);

    // تفعيل المسارات
    setupAppRoutes(app); 

    return app;
};