const express = require('express');
const router = express.Router();
const modelopsController = require('../controllers/modelops.controller');

router.get('/overview', (req, res) => modelopsController.getOverview(req, res));
router.get('/monitoring', (req, res) => modelopsController.getMonitoring(req, res));
router.get('/drift-reports', (req, res) => modelopsController.getDriftReports(req, res));

module.exports = router;
