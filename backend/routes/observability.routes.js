/**
 * Observability Routes — NexoApps Phase 8E
 */

const express = require('express');
const router = express.Router();
const { optionalAuthToken } = require('../middleware/auth.middleware');
const observabilityController = require('../controllers/observability.controller');

router.get('/telemetry', optionalAuthToken, observabilityController.getTelemetry);
router.get('/health', optionalAuthToken, observabilityController.getHealthSnapshot);
router.get('/optimization-profiles', optionalAuthToken, observabilityController.getOptimizationProfiles);

module.exports = router;
