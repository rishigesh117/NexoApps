/**
 * Deployment Runtime Routes — NexoApps Phase 8B
 */

const express = require('express');
const router = express.Router();
const { optionalAuthToken } = require('../middleware/auth.middleware');
const deploymentRuntimeController = require('../controllers/deployment_runtime.controller');

router.get('/deployments/:environmentId', optionalAuthToken, deploymentRuntimeController.listDeployments);
router.post('/deployments', optionalAuthToken, deploymentRuntimeController.createDeployment);
router.get('/scaling/:deploymentId', optionalAuthToken, deploymentRuntimeController.getScalingPolicy);
router.post('/scaling/:deploymentId', optionalAuthToken, deploymentRuntimeController.setScalingPolicy);

module.exports = router;
