/**
 * Integration Routes
 * NexoApps Platform - Phase 7B (Version 3.1)
 */

const express = require('express');
const router = express.Router();
const integrationController = require('../controllers/integration.controller');
const { optionalAuthToken } = require('../middleware/auth.middleware');

router.get('/providers', optionalAuthToken, integrationController.getProviders);

module.exports = router;
