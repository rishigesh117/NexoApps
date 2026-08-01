/**
 * Owner Notification Service & Center
 * NexoApps Platform - Phase 4B
 */

class OwnerNotificationService {
  constructor() {
    this.notifications = [
      {
        id: 'notif-1',
        type: 'app_published',
        title: 'App Published Successfully',
        message: 'Batlytics v1.0.0-beta has been published live to the NexoApps store.',
        isRead: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
      },
      {
        id: 'notif-2',
        type: 'new_review',
        title: 'New 5-Star Review Received',
        message: 'Alex Turner left a 5-star review: "Essential cricket scoring tool!"',
        isRead: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
      },
      {
        id: 'notif-3',
        type: 'upload_complete',
        title: 'APK Validation Verified',
        message: 'Batlytics APK build #2 passed all SHA-256 format checks.',
        isRead: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
      },
    ];
  }

  getNotifications() {
    return this.notifications;
  }

  getUnreadCount() {
    return this.notifications.filter((n) => !n.isRead).length;
  }

  markAllAsRead() {
    this.notifications.forEach((n) => { n.isRead = true; });
    return this.notifications;
  }

  markAsRead(id) {
    const item = this.notifications.find((n) => n.id === id);
    if (item) item.isRead = true;
    return item;
  }

  notify({ type, title, message, metadata = {} }) {
    const newNotif = {
      id: `notif-${Date.now()}`,
      type,
      title,
      message,
      isRead: false,
      createdAt: new Date().toISOString(),
      metadata,
    };
    this.notifications.unshift(newNotif);
    return newNotif;
  }
}

module.exports = new OwnerNotificationService();
