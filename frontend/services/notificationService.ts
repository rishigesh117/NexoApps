import { fetchApi } from './apiClient';
import { PlatformNotification } from '../types';

export async function getPlatformNotifications(): Promise<PlatformNotification[]> {
  const res = await fetchApi<{ success: boolean; data: PlatformNotification[] }>('/platform/notifications');
  return res.data || [];
}
