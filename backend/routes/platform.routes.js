/**
 * Platform OS Routes
 * NexoApps Platform - Phase 6E (Version 2.5)
 */

const express = require('express');
const router = express.Router();
const platformController = require('../controllers/platform.controller');
const { optionalAuthToken } = require('../middleware/auth.middleware');

router.get('/health', optionalAuthToken, platformController.getHealth);
router.get('/notifications', optionalAuthToken, platformController.getNotifications);
router.get('/commands', optionalAuthToken, platformController.getCommands);

module.exports = router;
