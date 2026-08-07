/**
 * Integration Routes
 * NexoApps Platform - Version 8.3 (Phase 11C)
 */

const express = require('express');
const router = express.Router();
const integrationController = require('../controllers/integration.controller');
const { optionalAuthToken } = require('../middleware/auth.middleware');

router.get('/providers', optionalAuthToken, integrationController.getProviders);

// Phase 11C Extensions
router.get('/integrations', optionalAuthToken, integrationController.listIntegrations);
router.post('/integrations', optionalAuthToken, integrationController.createIntegration);
router.get('/integrations/:id/connections', optionalAuthToken, integrationController.listConnections);
router.post('/connections/:connectionId/test', optionalAuthToken, integrationController.testConnection);

module.exports = router;
