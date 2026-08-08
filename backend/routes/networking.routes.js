const express = require('express');
const router = express.Router();
const networkingController = require('../controllers/networking.controller');

router.get('/overview', (req, res) => networkingController.getOverview(req, res));
router.get('/health', (req, res) => networkingController.getHealth(req, res));
router.get('/analytics', (req, res) => networkingController.getAnalytics(req, res));

module.exports = router;
