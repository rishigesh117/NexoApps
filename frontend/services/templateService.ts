import { fetchApi } from './apiClient';
import { AITemplate } from '../types';

export async function getAITemplates(): Promise<AITemplate[]> {
  const res = await fetchApi<{ success: boolean; data: AITemplate[] }>('/builder/templates');
  return res.data || [];
}
