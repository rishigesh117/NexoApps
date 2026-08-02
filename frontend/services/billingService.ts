import { fetchApi } from './apiClient';
import { PaymentMethod, UsageRecord } from '../types';

export async function getBillingOverview(tenantId?: string): Promise<{ overview: any; paymentMethods: PaymentMethod[]; usage: UsageRecord[] }> {
  const query = tenantId ? `?tenantId=${tenantId}` : '';
  const res = await fetchApi<{ success: boolean; data: { overview: any; paymentMethods: PaymentMethod[]; usage: UsageRecord[] } }>(`/billing${query}`);
  return res.data || { overview: {}, paymentMethods: [], usage: [] };
}
