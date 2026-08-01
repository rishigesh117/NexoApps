/**
 * Admin Routes
 * NexoApps Platform - Phase 3E
 */

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const pipelineController = require('../controllers/publishing_pipeline.controller');
const authenticateToken = require('../middleware/auth.middleware');
const { requireAdmin } = require('../middleware/auth.middleware');

// All Admin routes require valid JWT token & ADMIN role
router.use(authenticateToken, requireAdmin);

// User Management
router.get('/users', adminController.getUsers);
router.patch('/users/:id', adminController.updateUser);

// App Catalog & Upload Portal Management
router.get('/apps', adminController.getApps);
router.post('/apps', adminController.createApp);
router.post('/apps/upload', adminController.uploadApp);
router.get('/apps/drafts', adminController.getDraftApps);
router.get('/apps/published', adminController.getPublishedApps);
router.get('/apps/archived', adminController.getArchivedApps);
router.get('/apps/owner-stats', adminController.getOwnerStats);
router.post('/apps/:id/publish', adminController.publishApp);
router.post('/apps/:id/archive', adminController.archiveApp);
router.patch('/apps/:id', adminController.updateApp);
router.delete('/apps/:id', adminController.deleteApp);

// Phase 4B: Publishing Pipeline & Analytics
router.post('/pipeline/validate-apk', pipelineController.validateApk);
router.post('/pipeline/process-media', pipelineController.processMedia);
router.get('/pipeline/analytics', pipelineController.getAnalytics);
router.get('/pipeline/versions/:appId', pipelineController.getVersions);
router.post('/pipeline/versions/:appId', pipelineController.createVersion);
router.post('/pipeline/versions/:appId/rollback', pipelineController.rollbackVersion);
router.get('/pipeline/notifications', pipelineController.getNotifications);
router.post('/pipeline/notifications/read', pipelineController.markNotificationsRead);

// Reviews & Downloads Moderation
router.get('/reviews', adminController.getReviews);
router.get('/downloads', adminController.getDownloads);

module.exports = router;
