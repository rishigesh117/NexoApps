import { fetchApi } from './apiClient';
import { ApiRateLimit } from '../types';

export async function getGatewayStatus(): Promise<{ status: any; rateLimits: ApiRateLimit[] }> {
  const res = await fetchApi<{ success: boolean; data: { status: any; rateLimits: ApiRateLimit[] } }>('/gateway/status');
  return res.data || { status: {}, rateLimits: [] };
}
