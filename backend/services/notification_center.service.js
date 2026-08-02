/**
 * Notification Center Service
 * NexoApps Platform - Phase 6E (Version 2.5)
 */

class NotificationCenterService {
  constructor() {
    this.notifications = [
      {
        id: 'notif-1',
        userId: 'usr-1',
        title: 'Model Deployment Active',
        message: 'Nexo-LLM 7B Instruct model status is RUNNING with 4 replicas.',
        type: 'SUCCESS',
        module: 'PLATFORM',
        link: '/ai-platform/deployments',
        isRead: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'notif-2',
        userId: 'usr-1',
        title: 'New Marketplace Purchase',
        message: 'A developer purchased your SaaS Multi-Tenant Starter Template ($49.00).',
        type: 'INFO',
        module: 'MARKETPLACE',
        link: '/dashboard/payouts',
        isRead: false,
        createdAt: new Date(Date.now() - 3600000).toISOString(),
      },
    ];
  }

  getNotifications(userId) {
    return this.notifications;
  }
}

module.exports = new NotificationCenterService();
