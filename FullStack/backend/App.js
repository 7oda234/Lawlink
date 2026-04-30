import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { activityLogger } from './middleware/audit.js';
import { setupAppRoutes } from './controllers/app.controller.js'; // 👈 استيراد الموزع

export const bootstrap = () => {
    const app = express();

    // Middlewares الأساسية
    app.use(helmet());
    app.use(cors());

    // ✅ الحل النهائي: زيادة الحد المسموح به لاستقبال الصور الكبيرة وتنسيق الروابط
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ limit: '50mb', extended: true }));

    app.use(activityLogger);

    // 🚀 "تظبيطة" الـ Routers كلها في سطر واحد
    setupAppRoutes(app); 

    return app;
};
