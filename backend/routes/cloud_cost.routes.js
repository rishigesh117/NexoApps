const express = require('express');
const router = express.Router();
const cloudCostController = require('../controllers/cloud_cost.controller');

router.get('/summary', (req, res) => cloudCostController.getCostSummary(req, res));
router.get('/recommendations', (req, res) => cloudCostController.getRecommendations(req, res));

module.exports = router;
