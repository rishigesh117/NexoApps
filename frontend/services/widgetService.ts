import { fetchApi } from './apiClient';
import { DashboardWidget } from '../types';

export async function getDashboardWidgets(): Promise<DashboardWidget[]> {
  const res = await fetchApi<{ success: boolean; data: { widgets: DashboardWidget[] } }>('/dashboard');
  return res.data?.widgets || [];
}
