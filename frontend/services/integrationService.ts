import { fetchApi } from './apiClient';
import { IntegrationProvider, IntegrationLog } from '../types';

export async function getIntegrationProviders(): Promise<{ providers: IntegrationProvider[]; logs: IntegrationLog[] }> {
  const res = await fetchApi<{ success: boolean; data: { providers: IntegrationProvider[]; logs: IntegrationLog[] } }>('/integrations/providers');
  return res.data || { providers: [], logs: [] };
}
