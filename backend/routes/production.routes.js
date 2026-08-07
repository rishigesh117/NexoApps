const express = require('express');
const router = express.Router();
const productionController = require('../controllers/production.controller');

router.get('/overview', (req, res) => productionController.getOverview(req, res));
router.get('/performance', (req, res) => productionController.getPerformance(req, res));
router.get('/autoscaling', (req, res) => productionController.getAutoscaling(req, res));
router.get('/service-discovery', (req, res) => productionController.getServiceDiscovery(req, res));

module.exports = router;
