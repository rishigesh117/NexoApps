/**
 * LTS Routes — NexoApps Phase 7E
 */

const express = require('express');
const router = express.Router();
const { optionalAuthToken } = require('../middleware/auth.middleware');
const ltsController = require('../controllers/lts.controller');

router.get('/health', optionalAuthToken, ltsController.getHealthStatus);
router.get('/security-audit', optionalAuthToken, ltsController.getSecurityAudit);
router.get('/performance-metrics', optionalAuthToken, ltsController.getPerformanceMetrics);
router.get('/security-events', optionalAuthToken, ltsController.listSecurityEvents);

module.exports = router;
