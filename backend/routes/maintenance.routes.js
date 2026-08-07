const express = require('express');
const router = express.Router();
const maintenanceController = require('../controllers/maintenance.controller');

router.get('/windows', (req, res) => maintenanceController.getWindows(req, res));
router.get('/support-tickets', (req, res) => maintenanceController.getTickets(req, res));

module.exports = router;
