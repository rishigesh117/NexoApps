import { fetchApi } from './apiClient';
import { AIWorkflow } from '../types';

export async function getAIWorkflows(): Promise<AIWorkflow[]> {
  const res = await fetchApi<{ success: boolean; data: AIWorkflow[] }>('/builder/workflows');
  return res.data || [];
}

export async function createAIWorkflow(name: string, triggerType: string, actions: string[]): Promise<AIWorkflow> {
  const res = await fetchApi<{ success: boolean; data: AIWorkflow }>('/builder/workflow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, triggerType, actions }),
  });
  return res.data;
}
