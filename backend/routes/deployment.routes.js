/**
 * Deployment Routes
 * NexoApps Platform - Phase 5E (Version 2.0 EC1)
 */

const express = require('express');
const router = express.Router();
const deploymentController = require('../controllers/deployment.controller');
const { optionalAuthToken } = require('../middleware/auth.middleware');

router.get('/', optionalAuthToken, deploymentController.getDeployments);

module.exports = router;
