const express = require('express');
const router = express.Router();
const cloudController = require('../controllers/cloud.controller');

router.get('/regions', (req, res) => cloudController.getRegions(req, res));
router.get('/health', (req, res) => cloudController.getHealth(req, res));
router.get('/capacity-plans', (req, res) => cloudController.getCapacityPlans(req, res));

module.exports = router;
