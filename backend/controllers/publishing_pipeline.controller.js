/**
 * Publishing Pipeline Controller
 * NexoApps Platform - Phase 4B
 */

const apkProcessingService = require('../services/apk_processing.service');
const mediaProcessingService = require('../services/media_processing.service');
const analyticsService = require('../services/analytics.service');
const versionService = require('../services/version.service');
const notificationService = require('../services/owner_notification.service');
const adminService = require('../services/admin.service');

class PublishingPipelineController {
  // Validate APK format & duplicates
  validateApk(req, res) {
    try {
      const report = apkProcessingService.validateApk(req.body);
      if (!report.isValid) {
        notificationService.notify({
          type: 'validation_failed',
          title: 'APK Validation Warning',
          message: `APK validation returned warnings/errors for ${report.packageName}`,
        });
      }
      return res.status(200).json({ success: true, data: report });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }

  // Process Media
  processMedia(req, res) {
    try {
      const result = mediaProcessingService.processImage(req.body);
      return res.status(200).json({ success: true, data: result });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }

  // Get Owner Analytics
  getAnalytics(req, res) {
    try {
      const analytics = analyticsService.getOwnerAnalytics();
      return res.status(200).json({ success: true, data: analytics });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }

  // Version Management
  getVersions(req, res) {
    try {
      const { appId } = req.params;
      const versions = versionService.getVersionsForApp(appId);
      return res.status(200).json({ success: true, data: versions });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }

  createVersion(req, res) {
    try {
      const { appId } = req.params;
      const newVersion = versionService.addVersionRecord(appId, req.body);
      notificationService.notify({
        type: 'version_updated',
        title: 'New Version Created',
        message: `Version v${newVersion.versionName} created for app ${appId}.`,
      });
      return res.status(201).json({ success: true, data: newVersion });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }

  rollbackVersion(req, res) {
    try {
      const { appId } = req.params;
      const { versionId } = req.body;
      const result = versionService.rollbackToVersion(appId, versionId);
      return res.status(200).json({ success: true, data: result });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }

  // Owner Notifications
  getNotifications(req, res) {
    try {
      const list = notificationService.getNotifications();
      const unreadCount = notificationService.getUnreadCount();
      return res.status(200).json({ success: true, data: { notifications: list, unreadCount } });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }

  markNotificationsRead(req, res) {
    try {
      const list = notificationService.markAllAsRead();
      return res.status(200).json({ success: true, data: list });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }
}

module.exports = new PublishingPipelineController();
