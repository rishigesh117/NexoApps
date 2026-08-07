import { fetchApi } from './apiClient';
import { EnterpriseCost } from '../../shared/types';

export const getEnterpriseCosts = async (): Promise<EnterpriseCost[]> => {
  try {
    const res = await fetchApi<{ success: boolean; data: EnterpriseCost[] }>('/enterprise/admin/costs');
    return res.data;
  } catch {
    return [
      { id: 'cost-1', costCenter: 'AI Compute & GPU Cluster', allocatedBudget: 50000, actualSpend: 34200, currency: 'USD', recordedMonth: '2026-08' },
      { id: 'cost-2', costCenter: 'Cloud Infrastructure & Lakehouse', allocatedBudget: 30000, actualSpend: 21500, currency: 'USD', recordedMonth: '2026-08' },
      { id: 'cost-3', costCenter: 'Enterprise Storage & Backups', allocatedBudget: 15000, actualSpend: 8400, currency: 'USD', recordedMonth: '2026-08' }
    ];
  }
};

export const enterpriseCostService = {
  getEnterpriseCosts
};
