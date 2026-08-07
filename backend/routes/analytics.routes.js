const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analytics.controller');

router.get('/metrics', (req, res) => analyticsController.getMetrics(req, res));
router.get('/predictive-models', (req, res) => analyticsController.getPredictiveModels(req, res));

module.exports = router;
