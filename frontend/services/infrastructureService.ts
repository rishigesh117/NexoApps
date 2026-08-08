import { InfrastructureStack, ProvisioningJob, ProvisioningLog } from '../../shared/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const infrastructureService = {
  async getStacks(): Promise<InfrastructureStack[]> {
    try {
      const res = await fetch(`${API_BASE}/cloud-control/infrastructure/stacks`);
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      return [
        { id: 'istack-1', stackName: 'nexoapps-core-vpc-infrastructure', environment: 'production', templateType: 'terraform', status: 'deployed', createdAt: new Date().toISOString() },
        { id: 'istack-2', stackName: 'nexoapps-ai-modelops-cluster-stack', environment: 'production', templateType: 'helm', status: 'deployed', createdAt: new Date().toISOString() },
      ];
    }
  },

  async getProvisioningJobs(stackId?: string): Promise<ProvisioningJob[]> {
    try {
      const query = stackId ? `?stackId=${stackId}` : '';
      const res = await fetch(`${API_BASE}/cloud-control/infrastructure/provisioning-jobs${query}`);
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      return [
        { id: 'pjob-1', stackId: 'istack-1', action: 'apply', status: 'completed', startedAt: new Date(Date.now() - 3600000).toISOString(), completedAt: new Date(Date.now() - 3500000).toISOString() },
      ];
    }
  },

  async getProvisioningLogs(jobId?: string): Promise<ProvisioningLog[]> {
    try {
      const query = jobId ? `?jobId=${jobId}` : '';
      const res = await fetch(`${API_BASE}/cloud-control/infrastructure/provisioning-logs${query}`);
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      return [
        { id: 'plog-1', jobId: 'pjob-1', logLevel: 'info', message: 'Applying Terraform stack nexoapps-core-vpc-infrastructure...', timestamp: new Date(Date.now() - 3600000).toISOString() },
      ];
    }
  },
};
