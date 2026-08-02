/**
 * Runtime Routes
 * NexoApps Platform — Version 5.1 (Extended for Phase 8B)
 */

const express = require('express');
const router = express.Router();
const runtimeController = require('../controllers/runtime.controller');
const { optionalAuthToken } = require('../middleware/auth.middleware');

router.get('/', optionalAuthToken, runtimeController.getRuntimeTelemetry);

// Phase 8B Extensions
router.get('/environments', optionalAuthToken, runtimeController.listEnvironments);
router.get('/environments/:id', optionalAuthToken, runtimeController.getEnvironment);
router.post('/environments', optionalAuthToken, runtimeController.createEnvironment);
router.get('/environments/:id/instances', optionalAuthToken, runtimeController.listInstances);
router.post('/environments/:id/invoke', optionalAuthToken, runtimeController.invokeFunction);
router.get('/instances/:instanceId/containers', optionalAuthToken, runtimeController.listContainers);
router.get('/images', optionalAuthToken, runtimeController.listImages);

module.exports = router;
