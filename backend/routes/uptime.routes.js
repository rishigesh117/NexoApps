const express = require('express');
const router = express.Router();
const uptimeController = require('../controllers/uptime.controller');

router.get('/checks', (req, res) => uptimeController.getChecks(req, res));
router.post('/checks', (req, res) => uptimeController.createCheck(req, res));
router.get('/synthetic', (req, res) => uptimeController.getSyntheticMonitors(req, res));
router.post('/synthetic', (req, res) => uptimeController.createSyntheticMonitor(req, res));

module.exports = router;
