import express from 'express'; // بنستورد فريم وورك إكسبريس
import { uploadSingle, handleUploadError } from '../../middleware/upload.js'; // بنستورد الميدل وير الخاص برفع الملفات ومعالجة أخطائه
import { 
    conductResearch, // بنستورد كنترولر البحث
    contractReview, // بنستورد كنترولر مراجعة العقود
    handleLegalChat, // بنستورد كنترولر الشات القانوني
    predictOutcome, // بنستورد كنترولر توقع النتيجة
    draftDocument, // بنستورد كنترولر صياغة العقود
    handleCustomerServiceChat // بنستورد كنترولر الدعم الفني
} from './ai_tools.controller.js';

// بنعمل إنستنس من الراوتر عشان نربط عليه المسارات
const router = express.Router();

// بنربط مسار البحث بالكنترولر بتاعه
router.post('/research', conductResearch);

// بنربط مسار العقود وبنحط ميدل وير الرفع في النص عشان يمسك ملف الـ PDF الأول
router.post('/contract-review', uploadSingle('file'), handleUploadError, contractReview);

// بنربط مسار توقع النتيجة بالكنترولر بتاعه
router.post('/predict', predictOutcome);

// بنربط مسار الصياغة بالكنترولر بتاعه
router.post('/draft', draftDocument);

// بنربط مسار الشات القانوني بالكنترولر بتاعه
router.post('/chat', handleLegalChat);

// بنربط مسار الدعم الفني بالكنترولر بتاعه
router.post('/customer-support', handleCustomerServiceChat);

// بنعمل إكسبورت للراوتر عشان نستخدمه في ملف السيرفر الأساسي (app.js)
export default router;
