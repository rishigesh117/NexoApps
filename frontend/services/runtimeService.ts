import { fetchApi } from './apiClient';
import { RuntimeLog } from '../types';

export async function getRuntimeTelemetry(): Promise<RuntimeLog> {
  const res = await fetchApi<{ success: boolean; data: RuntimeLog }>('/runtime');
  return res.data;
}
