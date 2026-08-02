/**
 * Deployment V2 Routes — NexoApps Phase 7D
 */

const express = require('express');
const router = express.Router();
const { optionalAuthToken } = require('../middleware/auth.middleware');
const deploymentV2Controller = require('../controllers/deployment_v2.controller');

router.get('/targets', optionalAuthToken, deploymentV2Controller.listTargets);
router.post('/targets', optionalAuthToken, deploymentV2Controller.createTarget);
router.get('/targets/:targetId/jobs', optionalAuthToken, deploymentV2Controller.listJobs);
router.post('/jobs', optionalAuthToken, deploymentV2Controller.createJob);
router.get('/jobs/:jobId/logs', optionalAuthToken, deploymentV2Controller.getLogs);

router.get('/clusters', optionalAuthToken, deploymentV2Controller.listClusters);
router.post('/clusters', optionalAuthToken, deploymentV2Controller.createCluster);
router.get('/clusters/:clusterId/nodes', optionalAuthToken, deploymentV2Controller.listClusterNodes);

module.exports = router;
