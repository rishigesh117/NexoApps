const express = require('express');
const router = express.Router();
const monitoringController = require('../controllers/monitoring.controller');

router.get('/alerts', (req, res) => monitoringController.getAlerts(req, res));
router.get('/health-checks', (req, res) => monitoringController.getHealthChecks(req, res));

module.exports = router;
