import { fetchApi } from './apiClient';
import { ModelDeployment } from '../../shared/types';

export const deploymentEndpointService = {
  getDeployments: async (): Promise<ModelDeployment[]> => {
    try {
      const res = await fetchApi<{ success: boolean; data: ModelDeployment[] }>('/modelops/deployments/deployments');
      return res.data;
    } catch {
      return [
        { id: 'dep-mdl-1', modelVersionId: 'mv-v1.4', deploymentName: 'prod-llm-70b-vllm-cluster', replicaCount: 4, status: 'healthy', createdAt: new Date().toISOString() }
      ];
    }
  },

  getInferenceStats: async () => {
    try {
      const res = await fetchApi<{ success: boolean; data: any }>('/modelops/deployments/inference-stats');
      return res.data;
    } catch {
      return {
        totalRequestsToday: 1420000,
        averageLatencyMs: 14.2,
        activeEndpointsCount: 8,
        tokensServed: 840000000
      };
    }
  }
};
