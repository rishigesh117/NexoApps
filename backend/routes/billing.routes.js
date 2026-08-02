/**
 * Billing Routes
 * NexoApps Platform - Phase 7A (Version 3.0)
 */

const express = require('express');
const router = express.Router();
const billingController = require('../controllers/billing.controller');
const { optionalAuthToken } = require('../middleware/auth.middleware');

router.get('/', optionalAuthToken, billingController.getBillingOverview);

module.exports = router;
