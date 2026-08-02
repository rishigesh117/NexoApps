/**
 * Subscription Routes
 * NexoApps Platform - Phase 6D (Version 2.4)
 */

const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscription.controller');
const { optionalAuthToken } = require('../middleware/auth.middleware');

router.get('/', optionalAuthToken, subscriptionController.getSubscriptions);

module.exports = router;
