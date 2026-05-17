import express from 'express';
import * as controller from './admin_case_monitoring.controller.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';

const router = express.Router();

// Note: role-based auth can be tightened later. For now we keep parity with existing admin routes.
router.use(authMiddleware);

// CASES
router.get('/cases', controller.getCases);
router.get('/cases/:id', controller.getCaseById);

// CASE SUB-RESOURCES (for drawer tabs)
router.get('/cases/:id/documents', controller.getCaseDocuments);
router.get('/cases/:id/hearings', controller.getCaseHearings);
router.get('/cases/:id/messages', controller.getCaseMessages);
router.get('/cases/:id/analytics', controller.getCaseAnalytics);


// ANALYTICS
router.get('/cases/stats', controller.getCasesStats);
router.get('/cases/analytics', controller.getCasesAnalytics);
router.get('/cases/workload', controller.getCasesWorkload);
router.get('/cases/performance', controller.getCasesPerformance);

// ACTIVITY
router.get('/cases/activity', controller.getCasesActivity);
router.post('/cases/:id/activity', controller.postCaseActivity);

// ALERTS
router.get('/cases/alerts', controller.getCasesAlerts);
router.post('/cases/:id/escalate', controller.postCaseEscalate);

// STATUS MANAGEMENT
router.put('/cases/:id/status', controller.putCaseStatus);
router.post('/cases/:id/notes', controller.postCaseNotes);

export default router;

