import { fetchApi } from './apiClient';
import { OAuthApplication } from '../types';

export async function getOAuthApplications(): Promise<OAuthApplication[]> {
  const res = await fetchApi<{ success: boolean; data: OAuthApplication[] }>('/oauth/applications');
  return res.data || [];
}
