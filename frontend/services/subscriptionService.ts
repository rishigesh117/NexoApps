import { fetchApi } from './apiClient';
import { Subscription } from '../types';

export async function getUserSubscriptions(): Promise<Subscription[]> {
  const res = await fetchApi<{ success: boolean; data: Subscription[] }>('/subscriptions');
  return res.data || [];
}
