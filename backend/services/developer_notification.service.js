/**
 * Developer Notification Service
 * NexoApps Platform - Phase 4C
 */

class DeveloperNotificationService {
  constructor() {
    this.notifications = [
      {
        id: 'dev-notif-1',
        developerId: 'usr-demo-1',
        type: 'approved',
        title: 'App Submission Approved!',
        message: 'Your application Batlytics (v1.0.0-beta) has been approved by the Owner and published live to NexoApps.',
        isRead: false,
        createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      },
      {
        id: 'dev-notif-2',
        developerId: 'usr-demo-1',
        type: 'app_featured',
        title: 'Featured Badge Awarded',
        message: 'Congratulations! Batlytics has been selected for the NexoApps Featured Catalog Showcase.',
        isRead: false,
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
      },
    ];
  }

  getNotificationsForDeveloper(developerId) {
    return this.notifications.filter((n) => n.developerId === developerId);
  }

  getUnreadCount(developerId) {
    return this.getNotificationsForDeveloper(developerId).filter((n) => !n.isRead).length;
  }

  markAllAsRead(developerId) {
    this.notifications.forEach((n) => {
      if (n.developerId === developerId) n.isRead = true;
    });
    return this.getNotificationsForDeveloper(developerId);
  }

  notifyDeveloper({ developerId, type, title, message, metadata = {} }) {
    const item = {
      id: `dev-notif-${Date.now()}`,
      developerId,
      type,
      title,
      message,
      isRead: false,
      createdAt: new Date().toISOString(),
      metadata,
    };
    this.notifications.unshift(item);
    return item;
  }
}

module.exports = new DeveloperNotificationService();
