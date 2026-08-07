const express = require('express');
const router = express.Router();
const controller = require('../controllers/database_platform.controller');

router.get('/overview', (req, res) => controller.getOverview(req, res));
router.get('/clusters', (req, res) => controller.getClusters(req, res));
router.get('/health', (req, res) => controller.getHealth(req, res));
router.get('/analytics', (req, res) => controller.getQueryAnalytics(req, res));
router.get('/disaster-recovery', (req, res) => controller.getDisasterRecovery(req, res));

module.exports = router;
