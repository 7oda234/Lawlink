import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { activityLogger } from './middleware/audit.js';
import { setupAppRoutes } from './controllers/app.controller.js';

export const bootstrap = () => {
    const app = express();

    // ==========================================
    // ✅ الحل الجذري لمشكلة مسار الـ Uploads
    // ==========================================
    // process.cwd() بيشاور على المجلد الرئيسي للمشروع (backend)
    app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

    // Middlewares الأساسية
    // قفلنا حماية الـ Cross-Origin للريسورسز عشان React يقدر يقرأ الـ PDF
    app.use(helmet({
        crossOriginResourcePolicy: false,
    }));
    
    app.use(cors());

    // السماح بالملفات الكبيرة
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ limit: '50mb', extended: true }));

    app.use(activityLogger);

    // تفعيل المسارات
    setupAppRoutes(app); 

    return app;
};