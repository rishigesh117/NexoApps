import { fetchApi } from './apiClient';
import { GlobalSearchResult } from '../types';

export async function searchPlatform(query: string): Promise<GlobalSearchResult[]> {
  const res = await fetchApi<{ success: boolean; data: GlobalSearchResult[] }>(`/platform-search?q=${encodeURIComponent(query)}`);
  return res.data || [];
}
