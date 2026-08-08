const express = require('express');
const router = express.Router();
const infrastructureController = require('../controllers/infrastructure.controller');

router.get('/stacks', (req, res) => infrastructureController.getStacks(req, res));
router.post('/stacks', (req, res) => infrastructureController.createStack(req, res));
router.get('/provisioning-jobs', (req, res) => infrastructureController.getProvisioningJobs(req, res));
router.get('/provisioning-logs', (req, res) => infrastructureController.getProvisioningLogs(req, res));

module.exports = router;
