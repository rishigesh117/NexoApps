/**
 * Platform Automation Routes
 * NexoApps Platform - Version 3.3 (Extended for Phase 7D)
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

module.exports = router;
