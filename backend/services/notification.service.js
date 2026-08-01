/**
 * User Notification Engine Service
 * NexoApps Platform - Phase 4D
 */

class NotificationService {
  constructor() {
    this.notifications = [
      {
        id: 'notif-usr-1',
        userId: 'usr-demo-1',
        type: 'developer_published',
        title: 'Batlytics v1.0.0-beta Live!',
        message: 'Batlytics Studio published an update to Batlytics scoring engine.',
        link: '/app/batlytics',
        read: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'notif-usr-2',
        userId: 'usr-demo-1',
        type: 'app_featured',
        title: 'Editors Choice Showcase',
        message: 'Batlytics was featured on NexoApps Storefront.',
        link: '/community',
        read: false,
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      },
    ];
  }

  getUserNotifications(userId) {
    return this.notifications.filter((n) => n.userId === userId);
  }

  getUnreadCount(userId) {
    return this.notifications.filter((n) => n.userId === userId && !n.read).length;
  }

  markAsRead(userId, notificationId) {
    if (notificationId) {
      const n = this.notifications.find((item) => item.id === notificationId && item.userId === userId);
      if (n) n.read = true;
    } else {
      this.notifications.forEach((n) => {
        if (n.userId === userId) n.read = true;
      });
    }
    return this.getUserNotifications(userId);
  }

  createNotification({ userId, type, title, message, link = '', metadata = {} }) {
    const notif = {
      id: `notif-${Date.now()}`,
      userId,
      type,
      title,
      message,
      link,
      read: false,
      metadata,
      createdAt: new Date().toISOString(),
    };
    this.notifications.unshift(notif);
    return notif;
  }
}

module.exports = new NotificationService();
