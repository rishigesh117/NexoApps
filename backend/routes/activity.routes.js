/**
 * Activity Routes
 * NexoApps Platform - Phase 6E (Version 2.5)
 */

const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activity.controller');
const { optionalAuthToken } = require('../middleware/auth.middleware');

router.get('/', optionalAuthToken, activityController.getActivityFeed);

module.exports = router;
