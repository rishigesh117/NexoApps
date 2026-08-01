/**
 * Master API Router Blueprint
 * NexoApps Platform
 */

const express = require('express');
const router = express.Router();

const appRoutes = require('./app.routes');
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const sessionRoutes = require('./session.routes');
const suggestionRoutes = require('./suggestion.routes');
const downloadRoutes = require('./download.routes');
const reviewRoutes = require('./review.routes');
const favoriteRoutes = require('./favorite.routes');
const adminRoutes = require('./admin.routes');
const developerRoutes = require('./developer.routes');
const dashboardRoutes = require('./dashboard.routes');
const developerWorkspaceRoutes = require('./developer.workspace.routes');
const submissionRoutes = require('./submission.routes');
const communityRoutes = require('./community.routes');
const notificationRoutes = require('./notification.routes');
const followRoutes = require('./follow.routes');
const collectionRoutes = require('./collection.routes');
const healthRoutes = require('./health.routes');
const searchRoutes = require('./search.routes');
const analyticsRoutes = require('./analytics.routes');
const assistantRoutes = require('./assistant.routes');
const supportRoutes = require('./support.routes');
const automationRoutes = require('./automation.routes');
const syncRoutes = require('./sync.routes');
const backupRoutes = require('./backup.routes');
const deviceRoutes = require('./device.routes');
const preferencesRoutes = require('./preferences.routes');

router.use('/apps', appRoutes);
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/session', sessionRoutes);
router.use('/suggestions', suggestionRoutes);
router.use('/downloads', downloadRoutes);
router.use('/reviews', reviewRoutes);
router.use('/favorites', favoriteRoutes);
router.use('/admin', adminRoutes);
router.use('/admin/developers', developerRoutes);
router.use('/admin/dashboard', dashboardRoutes);
router.use('/admin/submissions', submissionRoutes);
router.use('/developer', developerWorkspaceRoutes);

router.use('/community', communityRoutes);
router.use('/notifications', notificationRoutes);
router.use('/follow', followRoutes);
router.use('/collections', collectionRoutes);
router.use('/health', healthRoutes);
router.use('/search', searchRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/assistant', assistantRoutes);
router.use('/support', supportRoutes);
router.use('/automation', automationRoutes);

router.use('/sync', syncRoutes);
router.use('/backup', backupRoutes);
router.use('/devices', deviceRoutes);
router.use('/preferences', preferencesRoutes);

module.exports = router;
