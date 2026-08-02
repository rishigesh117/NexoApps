/**
 * Webhook Routes
 * NexoApps Platform - Phase 7B (Version 3.1)
 */

const express = require('express');
const router = express.Router();
const webhookController = require('../controllers/webhook.controller');
const { optionalAuthToken } = require('../middleware/auth.middleware');

router.get('/', optionalAuthToken, webhookController.getWebhooks);

module.exports = router;
