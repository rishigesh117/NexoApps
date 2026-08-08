import { EdgeWorkload, EdgeDeployment } from '../../shared/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const edgeWorkloadService = {
  async getWorkloads(): Promise<EdgeWorkload[]> {
    try {
      const res = await fetch(`${API_BASE}/cloud-control/edge`);
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      return [
        { id: 'ewl-1', workloadName: 'edge-auth-token-validator', containerImage: 'nexoapps/edge-auth:v9.5.0', targetScope: 'all_edge_pops', replicasPerPop: 2, status: 'active', createdAt: new Date().toISOString() },
        { id: 'ewl-2', workloadName: 'edge-ai-inference-accelerator', containerImage: 'nexoapps/edge-model-runner:v9.5.0', targetScope: 'regional_edge', replicasPerPop: 4, status: 'active', createdAt: new Date().toISOString() },
      ];
    }
  },

  async getDeployments(workloadId?: string): Promise<EdgeDeployment[]> {
    try {
      const query = workloadId ? `?workloadId=${workloadId}` : '';
      const res = await fetch(`${API_BASE}/cloud-control/edge/deployments${query}`);
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      return [
        { id: 'edep-1', workloadId: 'ewl-1', edgeLocationCode: 'US-EAST-IAD', deployedStatus: 'running', deployedAt: new Date().toISOString() },
        { id: 'edep-2', workloadId: 'ewl-1', edgeLocationCode: 'EU-WEST-FRA', deployedStatus: 'running', deployedAt: new Date().toISOString() },
      ];
    }
  },
};
