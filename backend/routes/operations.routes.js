/**
 * Operations Routes
 * NexoApps Platform - Phase 5E (Version 2.0 EC1)
 */

const express = require('express');
const router = express.Router();
const operationsController = require('../controllers/operations.controller');
const { optionalAuthToken } = require('../middleware/auth.middleware');

router.get('/metrics', optionalAuthToken, operationsController.getMetrics);
router.get('/logs', optionalAuthToken, operationsController.getLogs);
router.get('/queue', optionalAuthToken, operationsController.getQueueStatus);
router.get('/jobs', optionalAuthToken, operationsController.getJobs);

module.exports = router;
