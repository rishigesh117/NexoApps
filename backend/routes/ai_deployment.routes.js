/**
 * AI Deployment & Inference Routes
 * NexoApps Platform - Phase 6C (Version 2.3)
 */

const express = require('express');
const router = express.Router();
const aiDeploymentController = require('../controllers/ai_deployment.controller');
const { optionalAuthToken } = require('../middleware/auth.middleware');

router.get('/', optionalAuthToken, aiDeploymentController.getDeployments);
router.post('/', optionalAuthToken, aiDeploymentController.deployModel);
router.post('/inference', optionalAuthToken, aiDeploymentController.runInference);

module.exports = router;
