const express = require('express');
const router = express.Router();
const metricsController = require('../controllers/metrics.controller');

router.get('/', (req, res) => metricsController.getMetrics(req, res));
router.get('/samples', (req, res) => metricsController.getSamples(req, res));
router.post('/query', (req, res) => metricsController.queryMetrics(req, res));
router.post('/sample', (req, res) => metricsController.recordSample(req, res));

module.exports = router;
