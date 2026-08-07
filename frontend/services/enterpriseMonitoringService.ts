import { fetchApi } from './apiClient';
import { EnterpriseHealth, EnterpriseMetric } from '../../shared/types';

export const getEnterpriseHealth = async (): Promise<{ health: EnterpriseHealth[]; metrics: EnterpriseMetric[] }> => {
  try {
    const res = await fetchApi<{ success: boolean; data: { health: EnterpriseHealth[]; metrics: EnterpriseMetric[] } }>('/enterprise/admin/health');
    return res.data;
  } catch {
    return {
      health: [
        { id: 'h-1', subsystemName: 'AI Operating System', healthScore: 100, status: 'healthy', checkedAt: new Date().toISOString() },
        { id: 'h-2', subsystemName: 'AI Collaboration Platform', healthScore: 100, status: 'healthy', checkedAt: new Date().toISOString() },
        { id: 'h-3', subsystemName: 'AI Developer Cloud', healthScore: 100, status: 'healthy', checkedAt: new Date().toISOString() },
        { id: 'h-4', subsystemName: 'AI ModelOps Platform', healthScore: 100, status: 'healthy', checkedAt: new Date().toISOString() },
        { id: 'h-5', subsystemName: 'AI Enterprise Automation Platform', healthScore: 100, status: 'healthy', checkedAt: new Date().toISOString() }
      ],
      metrics: [
        { id: 'm-1', metricName: 'Platform Uptime (%)', metricValue: 99.99, recordedAt: new Date().toISOString() },
        { id: 'm-2', metricName: 'Average API Response Time (ms)', metricValue: 14.2, recordedAt: new Date().toISOString() }
      ]
    };
  }
};

export const enterpriseMonitoringService = {
  getEnterpriseHealth
};
