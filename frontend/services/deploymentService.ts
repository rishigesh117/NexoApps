import { fetchApi } from './apiClient';
import { DeploymentEntry } from '../types';

export async function getDeployments(): Promise<DeploymentEntry[]> {
  const res = await fetchApi<{ success: boolean; data: DeploymentEntry[] }>('/deployments');
  return res.data || [];
}
