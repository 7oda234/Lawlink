import express from 'express';
import * as adminController from './admin.controller.js';

const router = express.Router();

router.get('/users', adminController.getUsers);
router.get('/lawyers', adminController.getLawyers);
router.get('/lawyers/pending', adminController.getPendingLawyers);
router.post('/lawyers/approve', adminController.approveLawyer);
router.patch('/lawyers/:userId/verify', adminController.verifyLawyer);
router.get('/clients', adminController.getClients);
router.get('/cases', adminController.getCases);
router.get('/cases-monitoring', adminController.getCaseMonitoring);
router.get('/full-dashboard', adminController.getFullDashboard);
router.get('/reports-analytics', adminController.getReportsAnalytics);
router.get('/system-logs', adminController.getSystemLogs);
router.get('/ai-usage', adminController.getAIUsageLogs);
router.get('/financial-logs', adminController.getFinancialLogs);

// ✅ Missing Admin Dashboard endpoints (contract expected by frontend)
router.get('/profile', adminController.getAdminProfile);
router.get('/logs', adminController.getAdminLogs);
router.get('/documents', adminController.getAdminDocuments);
router.get('/hearings', adminController.getAdminHearings);
router.get('/messages', adminController.getAdminMessages);

export default router;

