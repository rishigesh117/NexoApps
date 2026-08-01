import { fetchApi } from './apiClient';
import { ProjectActivity, ProjectApiKey } from '../types';

export async function getWorkspaceOverview() {
  const res = await fetchApi<{ success: boolean; data: any }>('/workspace/overview');
  return res.data;
}

export async function getWorkspaceActivities(orgId?: string): Promise<ProjectActivity[]> {
  const query = orgId ? `?orgId=${orgId}` : '';
  const res = await fetchApi<{ success: boolean; data: ProjectActivity[] }>(`/workspace/activity${query}`);
  return res.data || [];
}

export async function getWorkspaceApiKeys(orgId?: string): Promise<ProjectApiKey[]> {
  const query = orgId ? `?orgId=${orgId}` : '';
  const res = await fetchApi<{ success: boolean; data: ProjectApiKey[] }>(`/workspace/keys${query}`);
  return res.data || [];
}

export async function createWorkspaceApiKey(orgId: string, keyName: string, permissions: string[]): Promise<ProjectApiKey> {
  const res = await fetchApi<{ success: boolean; data: ProjectApiKey }>('/workspace/keys', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orgId, keyName, permissions }),
  });
  return res.data;
}
