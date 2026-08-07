import { fetchApi } from './apiClient';
import { ComputeCluster, VirtualMachine } from '../../shared/types';

export const computeService = {
  getClusters: async (): Promise<ComputeCluster[]> => {
    try {
      const res = await fetchApi<{ success: boolean; data: ComputeCluster[] }>('/cloud-platform/compute/clusters');
      return res.data;
    } catch {
      return [
        { id: 'cluster-ai-1', tenantId: 'tnt-enterprise-01', regionId: 'reg-1', clusterName: 'NexoKube AI Engine', clusterType: 'kubernetes', nodeCount: 16, gpuCount: 32, status: 'ready', createdAt: new Date().toISOString() }
      ];
    }
  },

  getVirtualMachines: async (): Promise<VirtualMachine[]> => {
    try {
      const res = await fetchApi<{ success: boolean; data: VirtualMachine[] }>('/cloud-platform/compute/vms');
      return res.data;
    } catch {
      return [
        { id: 'vm-1001', tenantId: 'tnt-enterprise-01', clusterId: 'cluster-ai-1', subnetId: 'sub-2', name: 'ai-vision-worker-01', instanceType: 'ai.g5.4xlarge', vcpus: 16, ramGb: 64, gpus: 1, osImage: 'ubuntu-22.04-cuda12', privateIp: '10.0.2.14', publicIp: '54.210.12.89', status: 'running', createdAt: new Date().toISOString() }
      ];
    }
  }
};
