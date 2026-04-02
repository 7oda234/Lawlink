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
    app.use(express.json());
    app.use(activityLogger);

    // 🚀 "تظبيطة" الـ Routers كلها في سطر واحد
    setupAppRoutes(app); 

    return app;
};