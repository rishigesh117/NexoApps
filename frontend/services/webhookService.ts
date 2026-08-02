import { fetchApi } from './apiClient';
import { Webhook } from '../types';

export async function getWebhooks(): Promise<Webhook[]> {
  const res = await fetchApi<{ success: boolean; data: Webhook[] }>('/webhooks');
  return res.data || [];
}
