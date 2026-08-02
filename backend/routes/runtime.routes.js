/**
 * Runtime Routes
 * NexoApps Platform - Phase 6C (Version 2.3)
 */

const express = require('express');
const router = express.Router();
const runtimeController = require('../controllers/runtime.controller');
const { optionalAuthToken } = require('../middleware/auth.middleware');

router.get('/', optionalAuthToken, runtimeController.getRuntimeTelemetry);

module.exports = router;
