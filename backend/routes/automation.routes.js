/**
 * Platform Automation Routes
 * NexoApps Platform - Version 8.3 (Phase 11C)
 */

const express = require('express');
const router = express.Router();
const automationController = require('../controllers/automation.controller');
const { optionalAuthToken } = require('../middleware/auth.middleware');

router.get('/logs', optionalAuthToken, automationController.getLogs);
router.get('/report', optionalAuthToken, automationController.getAuditReport);

// Phase 7D Extensions
router.get('/jobs', optionalAuthToken, automationController.listJobs);
router.post('/jobs', optionalAuthToken, automationController.createJob);
router.post('/jobs/:id/toggle', optionalAuthToken, automationController.toggleJob);
router.get('/queues', optionalAuthToken, automationController.listQueues);
router.post('/queues', optionalAuthToken, automationController.createQueue);
router.get('/queues/:queueId/messages', optionalAuthToken, automationController.listQueueMessages);
router.post('/queues/:queueId/purge', optionalAuthToken, automationController.purgeQueue);
router.get('/workers', optionalAuthToken, automationController.listWorkers);
router.get('/schedules', optionalAuthToken, automationController.listSchedules);

// Phase 11C Extensions
router.get('/workspaces', optionalAuthToken, automationController.listWorkspaces);
router.post('/workspaces', optionalAuthToken, automationController.createWorkspace);
router.get('/triggers', optionalAuthToken, automationController.listTriggers);
router.post('/triggers', optionalAuthToken, automationController.createTrigger);
router.get('/business-rules', optionalAuthToken, automationController.listBusinessRules);
router.post('/business-rules', optionalAuthToken, automationController.createBusinessRule);
router.get('/decision-tables', optionalAuthToken, automationController.listDecisionTables);
router.post('/decision-tables', optionalAuthToken, automationController.createDecisionTable);
router.get('/analytics/dashboard', optionalAuthToken, automationController.getAnalyticsDashboard);

module.exports = router;
