import { fetchApi } from './apiClient';
import { ProjectPlan, DevelopmentTask } from '../types';

export async function getProjectPlans(): Promise<{ plans: ProjectPlan[]; tasks: DevelopmentTask[] }> {
  const res = await fetchApi<{ success: boolean; data: { plans: ProjectPlan[]; tasks: DevelopmentTask[] } }>('/planner/projects');
  return res.data || { plans: [], tasks: [] };
}

export async function createProjectPlan(data: Partial<ProjectPlan>): Promise<ProjectPlan> {
  const res = await fetchApi<{ success: boolean; data: ProjectPlan }>('/planner/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.data;
}
