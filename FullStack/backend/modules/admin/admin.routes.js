import express from 'express';
import * as adminController from './admin.controller.js';
import { authMiddleware, requireAdminLevel } from '../../middleware/authMiddleware.js';

const router = express.Router();

// Protect all admin routes
router.use(authMiddleware);

// Level 1: Auditor / Analyst
router.get('/full-dashboard', requireAdminLevel(1), adminController.getFullDashboard);
router.get('/reports-analytics', requireAdminLevel(1), adminController.getReportsAnalytics);
router.get('/system-logs', requireAdminLevel(1), adminController.getSystemLogs);
router.get('/cases-monitoring', requireAdminLevel(1), adminController.getCaseMonitoring);
router.get('/ai-usage', requireAdminLevel(1), adminController.getAIUsageLogs);
router.get('/profile', requireAdminLevel(1), adminController.getAdminProfile);


// Level 2: Customer Support
router.get('/users', requireAdminLevel(2), adminController.getUsers);
router.get('/clients', requireAdminLevel(2), adminController.getClients);
router.get('/cases', requireAdminLevel(2), adminController.getCases);
router.get('/documents', requireAdminLevel(2), adminController.getAdminDocuments);
router.get('/hearings', requireAdminLevel(2), adminController.getAdminHearings);
router.get('/messages', requireAdminLevel(2), adminController.getAdminMessages);
router.get('/tickets', requireAdminLevel(2), adminController.getSupportTickets);
router.put('/tickets/:id', requireAdminLevel(2), adminController.updateSupportTicket);
router.post('/messages', requireAdminLevel(2), adminController.sendAdminMessage);

// Level 3: Compliance & Verification
router.get('/lawyers', requireAdminLevel(3), adminController.getLawyers);
router.get('/lawyers/pending', requireAdminLevel(3), adminController.getPendingLawyers);
router.post('/lawyers/approve', requireAdminLevel(3), adminController.approveLawyer);
router.patch('/lawyers/:userId/verify', requireAdminLevel(3), adminController.verifyLawyer);
router.get('/lawyers/licenses', requireAdminLevel(3), adminController.getLawyerLicenses);
router.patch('/lawyers/licenses/:id', requireAdminLevel(3), adminController.verifyLawyerLicense);
router.get('/legal-documents', requireAdminLevel(3), adminController.getLegalDocumentsForReview);
router.patch('/legal-documents/:id/review', requireAdminLevel(3), adminController.reviewLegalDocument);
router.get('/fraud-detection', requireAdminLevel(3), adminController.getFraudDetectionLogs);

// Level 4: Operations Manager
router.get('/financial-logs', requireAdminLevel(4), adminController.getFinancialLogs);
router.post('/users', requireAdminLevel(4), adminController.createUser);
router.put('/users/:id', requireAdminLevel(4), adminController.updateUser);
router.delete('/users/:id', requireAdminLevel(4), adminController.deleteUser);
router.post('/cases', requireAdminLevel(4), adminController.createCase);
router.put('/cases/:id', requireAdminLevel(4), adminController.updateCase);
router.delete('/cases/:id', requireAdminLevel(4), adminController.deleteCase);
router.get('/escalations', requireAdminLevel(4), adminController.getEscalations);
router.put('/escalations/:id', requireAdminLevel(4), adminController.resolveEscalation);

// Level 5: Super Admin
router.get('/logs', requireAdminLevel(5), adminController.getAdminLogs);
router.post('/admins', requireAdminLevel(5), adminController.createAdmin);
router.put('/admins/:id', requireAdminLevel(5), adminController.updateAdmin);
router.delete('/admins/:id', requireAdminLevel(5), adminController.deleteAdmin);
router.get('/settings', requireAdminLevel(5), adminController.getSettings);
router.put('/settings', requireAdminLevel(5), adminController.updateSettings);
router.get('/db/backup', requireAdminLevel(5), adminController.getDatabaseBackups);
router.post('/db/backup', requireAdminLevel(5), adminController.createDatabaseBackup);

export default router;
