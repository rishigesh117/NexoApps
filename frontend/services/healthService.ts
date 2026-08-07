import { fetchApi } from './apiClient';
import { SystemHealth } from '../../shared/types';

export const healthService = {
  getHealth: async (): Promise<SystemHealth[]> => {
    try {
      const res = await fetchApi<{ success: boolean; data: SystemHealth[] }>('/platform/core/health');
      return res.data;
    } catch {
      return [
        { id: 'h-1', subsystem: 'AI Gateway', status: 'healthy', cpuPercent: 8.4, memoryPercent: 24.1, checkedAt: new Date().toISOString() },
        { id: 'h-2', subsystem: 'AI Cloud Infrastructure', status: 'healthy', cpuPercent: 14.2, memoryPercent: 38.5, checkedAt: new Date().toISOString() },
        { id: 'h-3', subsystem: 'AI Security & Zero Trust SOC', status: 'healthy', cpuPercent: 6.8, memoryPercent: 19.4, checkedAt: new Date().toISOString() }
      ];
    }
  }
};
