/**
 * API Gateway Routes
 * NexoApps Platform - Phase 7B (Version 3.1)
 */

const express = require('express');
const router = express.Router();
const apiGatewayController = require('../controllers/api_gateway.controller');
const { optionalAuthToken } = require('../middleware/auth.middleware');

router.get('/status', optionalAuthToken, apiGatewayController.getStatus);

module.exports = router;
