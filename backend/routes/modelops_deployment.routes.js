const express = require('express');
const router = express.Router();
const deploymentController = require('../controllers/deployment.controller');

router.get('/deployments', (req, res) => deploymentController.getDeployments(req, res));
router.get('/inference-stats', (req, res) => deploymentController.getInferenceStats(req, res));

module.exports = router;
