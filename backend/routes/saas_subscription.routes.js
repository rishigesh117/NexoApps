/**
 * SaaS Subscription Routes
 * NexoApps Platform - Phase 7A (Version 3.0)
 */

const express = require('express');
const router = express.Router();
const saasSubscriptionController = require('../controllers/saas_subscription.controller');
const { optionalAuthToken } = require('../middleware/auth.middleware');

router.get('/plans', optionalAuthToken, saasSubscriptionController.getPlans);

module.exports = router;
