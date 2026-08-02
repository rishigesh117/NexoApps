/**
 * Subscription Management Service
 * NexoApps Platform - Phase 6D (Version 2.4)
 */

class SubscriptionService {
  constructor() {
    this.subscriptions = [
      {
        id: 'sub-1',
        userId: 'usr-1',
        itemId: 'mk-1',
        status: 'ACTIVE',
        billingCycle: 'MONTHLY',
        amount: 29.00,
        currentPeriodEnd: new Date(Date.now() + 86400000 * 30).toISOString(),
        createdAt: new Date().toISOString(),
      },
    ];
  }

  getUserSubscriptions(userId) {
    return this.subscriptions;
  }
}

module.exports = new SubscriptionService();
