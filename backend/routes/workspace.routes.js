/**
 * Workspace Routes
 * NexoApps Platform - Phase 5D
 */

const express = require('express');
const router = express.Router();
const workspaceController = require('../controllers/workspace.controller');
const { optionalAuthToken } = require('../middleware/auth.middleware');

router.get('/overview', optionalAuthToken, workspaceController.getOverview);
router.get('/activity', optionalAuthToken, workspaceController.getActivityFeed);
router.get('/keys', optionalAuthToken, workspaceController.getApiKeys);
router.post('/keys', optionalAuthToken, workspaceController.createApiKey);

module.exports = router;
