import { fetchApi } from './apiClient';
import { SubscriptionPlan, Subscription } from '../../shared/types';

export const subscriptionService = {
  getPlans: async (): Promise<SubscriptionPlan[]> => {
    try {
      const res = await fetchApi<{ success: boolean; data: SubscriptionPlan[] }>('/commerce/subscriptions/plans');
      return res.data;
    } catch {
      return [
        { id: 'plan-starter', name: 'Starter AI Plan', slug: 'starter', price: 19.00, currency: 'USD', billingCycle: 'monthly', tier: 'pro', features: ['5,000 API Credits/mo'], maxApiCalls: 5000, maxStorageGb: 5, isActive: true, createdAt: new Date().toISOString() },
        { id: 'plan-pro', name: 'Pro Developer Plan', slug: 'pro', price: 49.00, currency: 'USD', billingCycle: 'monthly', tier: 'pro', features: ['50,000 API Credits/mo', 'Autonomous Agents'], maxApiCalls: 50000, maxStorageGb: 50, isActive: true, createdAt: new Date().toISOString() },
        { id: 'plan-enterprise', name: 'Enterprise OS Suite', slug: 'enterprise', price: 299.00, currency: 'USD', billingCycle: 'monthly', tier: 'enterprise', features: ['Unlimited Credits', 'SLA 99.99%'], maxApiCalls: 1000000, maxStorageGb: 1000, isActive: true, createdAt: new Date().toISOString() }
      ];
    }
  },

  getCurrentSubscription: async (): Promise<Subscription | null> => {
    try {
      const res = await fetchApi<{ success: boolean; data: Subscription }>('/commerce/subscriptions/current');
      return res.data;
    } catch {
      return {
        id: 'sub-101',
        userId: 'user-admin',
        planId: 'plan-pro',
        status: 'active',
        currentPeriodStart: new Date().toISOString(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        cancelAtPeriodEnd: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    }
  }
};
