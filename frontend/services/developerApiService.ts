import { fetchApi } from './apiClient';
import { DeveloperApiKey, SdkDownload } from '../types';

export async function getDeveloperApiKeys(): Promise<DeveloperApiKey[]> {
  const res = await fetchApi<{ success: boolean; data: DeveloperApiKey[] }>('/developer-api/keys');
  return res.data || [];
}

export async function getApiDocs(): Promise<any> {
  const res = await fetchApi<{ success: boolean; data: any }>('/developer-api/docs');
  return res.data || {};
}

export async function getSdks(): Promise<SdkDownload[]> {
  const res = await fetchApi<{ success: boolean; data: SdkDownload[] }>('/developer-api/sdks');
  return res.data || [];
}
