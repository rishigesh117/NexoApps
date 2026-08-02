import { fetchApi } from './apiClient';
import { License } from '../types';

export async function getLicenseForItem(itemId: string): Promise<License> {
  const res = await fetchApi<{ success: boolean; data: License }>(`/licenses/${itemId}`);
  return res.data;
}
