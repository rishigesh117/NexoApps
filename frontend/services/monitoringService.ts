import { fetchApi } from './apiClient';
import { ServerMetrics } from '../types';

export async function getServerMetrics(): Promise<ServerMetrics> {
  const res = await fetchApi<{ success: boolean; data: ServerMetrics }>('/operations/metrics');
  return res.data;
}

export async function getSystemLogs() {
  const res = await fetchApi<{ success: boolean; data: any[] }>('/operations/logs');
  return res.data || [];
}
