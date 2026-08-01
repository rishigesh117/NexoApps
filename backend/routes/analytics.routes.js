/**
 * Analytics Routes
 * NexoApps Platform - Phase 5A
 */

const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analytics.controller');
const { optionalAuthToken } = require('../middleware/auth.middleware');

router.get('/overview', optionalAuthToken, analyticsController.getOverview);
router.get('/developer/:developerId?', optionalAuthToken, analyticsController.getDeveloperAnalytics);

module.exports = router;
