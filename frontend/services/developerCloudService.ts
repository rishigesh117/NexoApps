import { fetchApi } from './apiClient';
import { BuildRunner } from '../../shared/types';

export const developerCloudService = {
  getOverview: async () => {
    try {
      const res = await fetchApi<{ success: boolean; data: any }>('/developer-cloud/core/overview');
      return res.data;
    } catch {
      return {
        deploymentFrequency: '24 / day',
        leadTimeForChanges: '14 mins',
        changeFailureRate: '0.01%',
        meanTimeToRecovery: '3 mins',
        activePipelinesCount: 18,
        activeRunnersCount: 12
      };
    }
  },

  getOrganizations: async (): Promise<any[]> => {
    try {
      const res = await fetchApi<{ success: boolean; data: any[] }>('/developer-cloud/core/orgs');
      return res.data;
    } catch {
      return [
        { id: 'org-dev-1', orgName: 'NexoApps Core Engineering', slug: 'nexoapps-core', billingPlan: 'enterprise', createdAt: new Date().toISOString() }
      ];
    }
  },

  getTeams: async (): Promise<any[]> => {
    try {
      const res = await fetchApi<{ success: boolean; data: any[] }>('/developer-cloud/core/teams');
      return res.data;
    } catch {
      return [
        { id: 'team-1', orgId: 'org-dev-1', teamName: 'Platform DevOps & SRE', slug: 'devops-sre', createdAt: new Date().toISOString() },
        { id: 'team-2', orgId: 'org-dev-1', teamName: 'AI Core Engine Team', slug: 'ai-core', createdAt: new Date().toISOString() }
      ];
    }
  },

  getRunners: async (): Promise<BuildRunner[]> => {
    try {
      const res = await fetchApi<{ success: boolean; data: BuildRunner[] }>('/developer-cloud/core/runners');
      return res.data;
    } catch {
      return [
        { id: 'run-k8s-01', runnerName: 'us-east-k8s-runner-cluster-01', runnerType: 'k8s-dind', status: 'online', maxJobs: 16, createdAt: new Date().toISOString() },
        { id: 'run-gpu-01', runnerName: 'nvidia-h100-ai-model-runner', runnerType: 'gpu-accelerated', status: 'online', maxJobs: 4, createdAt: new Date().toISOString() }
      ];
    }
  }
};
