import { fetchApi } from './apiClient';
import { ResourceGroup, ResourceAllocation } from '../../shared/types';

export const resourceService = {
  getResourceGroups: async (): Promise<ResourceGroup[]> => {
    try {
      const res = await fetchApi<{ success: boolean; data: ResourceGroup[] }>('/cloud-platform/resources/groups');
      return res.data;
    } catch {
      return [
        { id: 'rg-prod-ai', tenantId: 'tnt-enterprise-01', name: 'Production AI Cluster Group', description: 'Core LLM inference and vision model resources', createdAt: new Date().toISOString() }
      ];
    }
  },

  getAllocations: async (): Promise<ResourceAllocation[]> => {
    try {
      const res = await fetchApi<{ success: boolean; data: ResourceAllocation[] }>('/cloud-platform/resources/allocations');
      return res.data;
    } catch {
      return [
        { id: 'alloc-1', tenantId: 'tnt-enterprise-01', resourceType: 'compute', allocatedUnits: 128, unitName: 'vCPU', allocatedAt: new Date().toISOString() },
        { id: 'alloc-2', tenantId: 'tnt-enterprise-01', resourceType: 'gpu', allocatedUnits: 16, unitName: 'NVIDIA H100 GPU', allocatedAt: new Date().toISOString() }
      ];
    }
  }
};
