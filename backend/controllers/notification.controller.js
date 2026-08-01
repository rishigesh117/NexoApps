/**
 * Notification Controller Layer
 * NexoApps Platform - Phase 4D
 */

const notificationService = require('../services/notification.service');

class NotificationController {
  // GET /api/v1/notifications
  getNotifications(req, res) {
    try {
      const userId = req.user.id;
      const list = notificationService.getUserNotifications(userId);
      const unreadCount = notificationService.getUnreadCount(userId);
      return res.status(200).json({ success: true, data: { notifications: list, unreadCount } });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }

  // POST /api/v1/notifications/read
  markAsRead(req, res) {
    try {
      const userId = req.user.id;
      const { notificationId } = req.body;
      const list = notificationService.markAsRead(userId, notificationId);
      return res.status(200).json({ success: true, data: list });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }
}

module.exports = new NotificationController();
