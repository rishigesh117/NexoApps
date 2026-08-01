import { fetchApi } from './apiClient';
import { OrganizationProject } from '../types';

export async function getProjects(orgId?: string): Promise<OrganizationProject[]> {
  const query = orgId ? `?orgId=${orgId}` : '';
  const res = await fetchApi<{ success: boolean; data: OrganizationProject[] }>(`/projects${query}`);
  return res.data || [];
}

export async function createProject(orgId: string, name: string, description: string, category: string): Promise<OrganizationProject> {
  const res = await fetchApi<{ success: boolean; data: OrganizationProject }>('/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orgId, name, description, category }),
  });
  return res.data;
}
