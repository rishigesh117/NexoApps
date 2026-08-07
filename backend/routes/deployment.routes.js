const express = require('express');
const router = express.Router();
const deploymentController = require('../controllers/deployment.controller');

router.get('/deployments', (req, res) => deploymentController.getDeployments(req, res));
router.get('/environments', (req, res) => deploymentController.getEnvironments(req, res));
router.get('/iac-templates', (req, res) => deploymentController.getIacTemplates(req, res));

module.exports = router;
