/**
 * Webhook Service
 * NexoApps Platform - Phase 7B (Version 3.1)
 */

class WebhookService {
  constructor() {
    this.webhooks = [
      {
        id: 'wh-1',
        userId: 'usr-1',
        targetUrl: 'https://api.batlytics.dev/webhooks/nexo',
        events: ['model.deployed', 'marketplace.sale', 'agent.task_completed'],
        secret: 'whsec_849204928104829',
        isActive: true,
        createdAt: new Date().toISOString(),
      },
    ];
  }

  getWebhooks() {
    return this.webhooks;
  }
}

module.exports = new WebhookService();
