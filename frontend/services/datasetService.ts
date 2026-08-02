import { fetchApi } from './apiClient';
import { Dataset } from '../types';

export async function getDatasets(): Promise<Dataset[]> {
  const res = await fetchApi<{ success: boolean; data: Dataset[] }>('/datasets');
  return res.data || [];
}

export async function createDataset(data: Partial<Dataset>): Promise<Dataset> {
  const res = await fetchApi<{ success: boolean; data: Dataset }>('/datasets', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.data;
}
