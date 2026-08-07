/**
 * Subscription Service — NexoApps Phase 10A
 * Manages recurring subscription plans, user subscriptions, and lifecycle events.
 */

class SubscriptionService {
  constructor() {
    this.plans = [
      { id: 'plan-starter', name: 'Starter AI Plan', slug: 'starter', price: 19.00, currency: 'USD', billingCycle: 'monthly', tier: 'pro', features: ['5,000 API Credits/mo', 'Basic RAG Indexing', 'Standard Support'], maxApiCalls: 5000, maxStorageGb: 5, isActive: true, createdAt: new Date().toISOString() },
      { id: 'plan-pro', name: 'Pro Developer Plan', slug: 'pro', price: 49.00, currency: 'USD', billingCycle: 'monthly', tier: 'pro', features: ['50,000 API Credits/mo', 'Advanced RAG & Fine-Tuning', 'Priority Support', 'Autonomous Agent Cloud'], maxApiCalls: 50000, maxStorageGb: 50, isActive: true, createdAt: new Date().toISOString() },
      { id: 'plan-enterprise', name: 'Enterprise OS Suite', slug: 'enterprise', price: 299.00, currency: 'USD', billingCycle: 'monthly', tier: 'enterprise', features: ['Unlimited API Credits', 'Dedicated Infrastructure', 'SLA 99.99%', '24/7 Dedicated Account Manager'], maxApiCalls: 1000000, maxStorageGb: 1000, isActive: true, createdAt: new Date().toISOString() }
    ];
    this.subscriptions = [
      {
        id: 'sub-101',
        userId: 'user-admin',
        planId: 'plan-pro',
        status: 'active',
        currentPeriodStart: new Date().toISOString(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        cancelAtPeriodEnd: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
  }

  async getPlans() {
    return this.plans;
  }

  async getUserSubscription(userId = 'user-admin') {
    const sub = this.subscriptions.find(s => s.userId === userId && s.status === 'active');
    if (!sub) return null;
    const plan = this.plans.find(p => p.id === sub.planId);
    return { ...sub, plan };
  }

  async subscribe(userId, planId) {
    const plan = this.plans.find(p => p.id === planId);
    if (!plan) throw new Error('Subscription plan not found');
    const existing = this.subscriptions.find(s => s.userId === userId);
    if (existing) {
      existing.planId = planId;
      existing.status = 'active';
      existing.updatedAt = new Date().toISOString();
      return { ...existing, plan };
    }
    const newSub = {
      id: `sub-${Date.now()}`,
      userId,
      planId,
      status: 'active',
      currentPeriodStart: new Date().toISOString(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      cancelAtPeriodEnd: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.subscriptions.push(newSub);
    return { ...newSub, plan };
  }

  async cancelSubscription(userId) {
    const sub = this.subscriptions.find(s => s.userId === userId && s.status === 'active');
    if (sub) {
      sub.cancelAtPeriodEnd = true;
      sub.updatedAt = new Date().toISOString();
    }
    return { success: true, subscription: sub };
  }
}

module.exports = new SubscriptionService();
