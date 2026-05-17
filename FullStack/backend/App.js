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
    
    // CORS (Critical - unblock Admin Dashboard requests)
    const frontendOrigins = [
        'http://localhost:3000',
        'http://localhost:5173',
        process.env.FRONTEND_URL,
    ].filter(Boolean);

    app.use(cors({
        origin: (origin, callback) => {
            // allow non-browser requests (no origin)
            if (!origin) return callback(null, true);
            if (frontendOrigins.includes(origin)) return callback(null, true);
            // allow exact FRONTEND_URL match if configured
            if (process.env.FRONTEND_URL && origin === process.env.FRONTEND_URL) return callback(null, true);
            return callback(null, false);
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }));


    // السماح بالملفات الكبيرة
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ limit: '50mb', extended: true }));

    app.use(activityLogger);

    // تفعيل المسارات
    setupAppRoutes(app); 

    return app;
};
