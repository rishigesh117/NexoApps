import { fetchApi } from './apiClient';
import { ActivityFeedItem } from '../types';

export async function getActivityFeed(): Promise<ActivityFeedItem[]> {
  const res = await fetchApi<{ success: boolean; data: ActivityFeedItem[] }>('/activity');
  return res.data || [];
}
