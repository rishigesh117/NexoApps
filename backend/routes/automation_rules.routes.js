/**
 * Automation Rules Routes
 * NexoApps Platform - Phase 6E (Version 2.5)
 */

const express = require('express');
const router = express.Router();
const platformAutomationController = require('../controllers/platform_automation.controller');
const { optionalAuthToken } = require('../middleware/auth.middleware');

router.get('/', optionalAuthToken, platformAutomationController.getRules);

module.exports = router;
