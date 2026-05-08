import express from 'express';
// بنجيب الميدل وير المسؤول عن رفع الملفات (زي الـ Multer) عشان مراجعة العقود [cite: 4]
import { uploadSingle, handleUploadError } from '../../middleware/upload.js';
// بنجيب كل الوظائف اللي كتبناها في الكنترولر عشان نربطها بالمسارات 
import { 
    conductResearch, 
    contractReview, 
    handleLegalChat, 
    predictOutcome, 
    draftDocument,
    handleCustomerServiceChat // المسار الجديد اللي ضفناه لخدمة العملاء 
} from './ai_tools.controller.js';

const router = express.Router();

/** * 1. البحث القانوني الذكي (RAG)
 * بياخد سؤال وبيبعته لمحرك البحث في بايثون 
 */
router.post('/research', conductResearch);

/** * 2. مراجعة العقود (PDF Review)
 * بنستخدم uploadSingle عشان نستلم ملف الـ PDF ونحفظه مؤقتاً قبل ما نبعته للبايثون [cite: 4]
 */
router.post('/contract-review', uploadSingle('file'), handleUploadError, contractReview);

/** * 3. توقع نتيجة القضية
 * بياخد وقائع القضية ويرجع تحليل لنسبة النجاح 
 */
router.post('/predict', predictOutcome);

/** * 4. كتابة مسودات العقود
 * بيولد نصوص قانونية بناءً على نوع العقد وشروطه 
 */
router.post('/draft', draftDocument);

/** * 5. الشات القانوني (Legal Chat)
 * دردشة عامة في المواضيع القانونية المصرية 
 */
router.post('/chat', handleLegalChat);

/** * 6. شات خدمة العملاء (Customer Support Chat)
 * ده المسار المخصص للمساعدة في استخدام التطبيق والرد على المشاكل التقنية 
 */
router.post('/customer-support', handleCustomerServiceChat);

// بنصدر الراوتر عشان نستخدمه في ملف App.js أو Bootstrap 
export default router;
