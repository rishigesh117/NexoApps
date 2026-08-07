/**
 * Notification Center Service — NexoApps Phase 9E
 * Centralized notification dispatcher & real-time alert engine.
 */

class NotificationCenterService {
  constructor() {
    this.notifications = [
      { id: 'notif-1', userId: 'user-admin', title: 'Version 7.0 AI OS Online', message: 'NexoApps AI Operating System is fully operational with 100% module health.', category: 'system', isRead: false, actionUrl: '/workspace', createdAt: new Date().toISOString() },
      { id: 'notif-2', userId: 'user-admin', title: 'Automated Test Suite Passed', message: '42 test assertions completed with zero failures across microservices.', category: 'activity', isRead: false, actionUrl: '/software-engineering/testing', createdAt: new Date(Date.now() - 1800000).toISOString() }
    ];
  }

  async listNotifications(userId = 'user-admin') {
    return this.notifications.filter(n => n.userId === userId || n.userId === 'user-admin');
  }

  async markAsRead(id) {
    let notif = this.notifications.find(n => n.id === id);
    if (notif) notif.isRead = true;
    return notif;
  }
}

module.exports = new NotificationCenterService();
