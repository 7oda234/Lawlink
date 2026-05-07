import express from 'express';
// بنجيب الميدل وير بتاع رفع الملفات
import { uploadSingle, handleUploadError } from '../../middleware/upload.js';
// بنجيب الوظائف اللي لسه كاتبينها في الكنترولر
import { conductResearch, contractReview, handleLegalChat, predictOutcome, draftDocument } from './ai_tools.controller.js';

const router = express.Router();

// عنوان البحث القانوني
router.post('/research', conductResearch);
// عنوان مراجعة العقود (لازم نستخدم الميدل وير عشان نرفع الملف)
router.post('/contract-review', uploadSingle('file'), handleUploadError, contractReview);
// عنوان التوقع
router.post('/predict', predictOutcome);
// عنوان المسودة
router.post('/draft', draftDocument);
// عنوان الشات
router.post('/chat', handleLegalChat);

export default router;
