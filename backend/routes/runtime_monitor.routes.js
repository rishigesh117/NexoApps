/**
 * Runtime Monitor Routes — NexoApps Phase 8B
 */

const express = require('express');
const router = express.Router();
const { optionalAuthToken } = require('../middleware/auth.middleware');
const runtimeMonitorController = require('../controllers/runtime_monitor.controller');

router.get('/metrics/:instanceId', optionalAuthToken, runtimeMonitorController.getMetrics);
router.get('/logs/:instanceId', optionalAuthToken, runtimeMonitorController.getLogs);
router.get('/isolation/:environmentId', optionalAuthToken, runtimeMonitorController.verifyIsolationStatus);

module.exports = router;
