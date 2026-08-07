/**
 * Deployment Pipeline Routes — NexoApps Phase 9B
 */

const express = require('express');
const router = express.Router();
const { optionalAuthToken } = require('../middleware/auth.middleware');
const deploymentPipelineController = require('../controllers/deployment_pipeline.controller');

router.post('/build/:applicationId', optionalAuthToken, deploymentPipelineController.triggerBuild);
router.post('/deploy/:applicationId', optionalAuthToken, deploymentPipelineController.deployBuild);
router.get('/builds/:applicationId', optionalAuthToken, deploymentPipelineController.listBuilds);
router.get('/deployments/:applicationId', optionalAuthToken, deploymentPipelineController.listDeployments);
router.get('/environments/:applicationId', optionalAuthToken, deploymentPipelineController.listEnvironments);
router.post('/test/:applicationId', optionalAuthToken, deploymentPipelineController.runTests);
router.get('/versions/:applicationId', optionalAuthToken, deploymentPipelineController.listVersions);

module.exports = router;
