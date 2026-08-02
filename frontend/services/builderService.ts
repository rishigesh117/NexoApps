import { fetchApi } from './apiClient';
import { AIProject, GeneratedFile, PromptHistory } from '../types';

export async function getAIProjects(): Promise<AIProject[]> {
  const res = await fetchApi<{ success: boolean; data: AIProject[] }>('/builder/projects');
  return res.data || [];
}

export async function getAIProjectDetails(id: string): Promise<{ project: AIProject; files: GeneratedFile[] } | null> {
  const res = await fetchApi<{ success: boolean; data: { project: AIProject; files: GeneratedFile[] } }>(`/builder/project/${id}`);
  return res.data || null;
}

export async function createAIProject(data: Partial<AIProject>): Promise<AIProject> {
  const res = await fetchApi<{ success: boolean; data: AIProject }>('/builder/project', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.data;
}

export async function getPromptHistory(): Promise<PromptHistory[]> {
  const res = await fetchApi<{ success: boolean; data: PromptHistory[] }>('/builder/history');
  return res.data || [];
}
