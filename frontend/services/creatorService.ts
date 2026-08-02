import { fetchApi } from './apiClient';
import { CreatorProfile } from '../types';

export async function getCreators(): Promise<CreatorProfile[]> {
  const res = await fetchApi<{ success: boolean; data: CreatorProfile[] }>('/creators');
  return res.data || [];
}

export async function getCreatorByUsername(username: string): Promise<CreatorProfile> {
  const res = await fetchApi<{ success: boolean; data: CreatorProfile }>(`/creators/${username}`);
  return res.data;
}

export async function getCreatorPayouts(): Promise<any> {
  const res = await fetchApi<{ success: boolean; data: any }>('/creators/payouts');
  return res.data;
}
