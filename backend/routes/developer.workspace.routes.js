/**
 * Developer Workspace Routes
 * NexoApps Platform - Phase 4C
 */

const express = require('express');
const router = express.Router();
const developerController = require('../controllers/developer.controller');
const authenticateToken = require('../middleware/auth.middleware');
const { optionalAuthToken, requireDeveloper } = require('../middleware/auth.middleware');

// Public route: View public profile by username
router.get('/profile/public/:username', optionalAuthToken, developerController.getPublicProfile);

// Authenticated MEMBER routes (for applying to become Developer)
router.post('/apply', authenticateToken, developerController.applyForDeveloper);
router.get('/application-status', authenticateToken, developerController.getApplicationStatus);

// Authenticated DEVELOPER / ADMIN / OWNER workspace routes
router.get('/dashboard', authenticateToken, requireDeveloper, developerController.getDashboard);
router.patch('/profile', authenticateToken, requireDeveloper, developerController.updateProfile);
router.post('/submit-app', authenticateToken, requireDeveloper, developerController.submitApp);
router.get('/notifications', authenticateToken, requireDeveloper, developerController.getNotifications);
router.post('/notifications/read', authenticateToken, requireDeveloper, developerController.markNotificationsRead);

module.exports = router;
