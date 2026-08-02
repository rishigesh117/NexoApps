import { fetchApi } from './apiClient';
import { SubscriptionPlan } from '../types';

export async function getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
  const res = await fetchApi<{ success: boolean; data: SubscriptionPlan[] }>('/tenant-subscriptions/plans');
  return res.data || [];
}
