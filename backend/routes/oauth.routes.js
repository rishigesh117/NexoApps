/**
 * OAuth Routes
 * NexoApps Platform - Phase 7B (Version 3.1)
 */

const express = require('express');
const router = express.Router();
const oauthController = require('../controllers/oauth.controller');
const { optionalAuthToken } = require('../middleware/auth.middleware');

router.get('/applications', optionalAuthToken, oauthController.getApplications);

module.exports = router;
