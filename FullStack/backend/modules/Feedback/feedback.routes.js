import express from 'express';
const router = express.Router();
// استيراد الدوال من الكونترولر (تأكد من المسار الصحيح)
import * as feedbackController from './feedback.controller.js'; 

router.post('/', feedbackController.createFeedback);
router.get('/case/:caseId', feedbackController.getFeedbackByCase);
router.put('/:id', feedbackController.updateFeedback);

// 🆕 المسار الجديد لجلب تقييمات المحامي
router.get('/lawyer/:lawyerId', feedbackController.getFeedbackByLawyer);

export default router; // هذه هي الإضافة الضرورية