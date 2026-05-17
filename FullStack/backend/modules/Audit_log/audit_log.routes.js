import express from 'express';
// تأكد من مسار الكنترولر حسب هيكلة مشروعك
import { getAllLogs } from '../controllers/audit_log.controller.js'; 

const router = express.Router();

// هذا المسار سيصبح (/api/admin/logs) عند دمجه في السيرفر
router.get('/logs', getAllLogs);

export default router;
