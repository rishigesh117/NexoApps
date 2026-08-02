import { fetchApi } from './apiClient';

export async function getDashboardData(): Promise<{ metrics: any; continueWorking: any[]; widgets: any[] }> {
  const res = await fetchApi<{ success: boolean; data: { metrics: any; continueWorking: any[]; widgets: any[] } }>('/dashboard');
  return res.data || { metrics: {}, continueWorking: [], widgets: [] };
}
