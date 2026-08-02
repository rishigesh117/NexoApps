import { fetchApi } from './apiClient';
import { AIModel } from '../types';

export async function getAIModels(): Promise<AIModel[]> {
  const res = await fetchApi<{ success: boolean; data: AIModel[] }>('/models');
  return res.data || [];
}

export async function registerAIModel(data: Partial<AIModel>): Promise<AIModel> {
  const res = await fetchApi<{ success: boolean; data: AIModel }>('/models', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.data;
}
