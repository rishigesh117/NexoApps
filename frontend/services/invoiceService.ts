import { fetchApi } from './apiClient';
import { Invoice } from '../types';

export async function getInvoices(tenantId?: string): Promise<Invoice[]> {
  const query = tenantId ? `?tenantId=${tenantId}` : '';
  const res = await fetchApi<{ success: boolean; data: Invoice[] }>(`/invoices${query}`);
  return res.data || [];
}
