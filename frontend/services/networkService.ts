import { fetchApi } from './apiClient';
import { VirtualNetwork } from '../../shared/types';

export const networkService = {
  getVnets: async (): Promise<VirtualNetwork[]> => {
    try {
      const res = await fetchApi<{ success: boolean; data: VirtualNetwork[] }>('/cloud-platform/networks');
      return res.data;
    } catch {
      return [
        { id: 'vnet-101', tenantId: 'tnt-enterprise-01', regionId: 'reg-1', name: 'NexoMainVNET', cidrBlock: '10.0.0.0/16', status: 'active', createdAt: new Date().toISOString() }
      ];
    }
  }
};
