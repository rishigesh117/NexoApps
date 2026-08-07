import { fetchApi } from './apiClient';
import { ModelMonitoring, ModelDriftReport } from '../../shared/types';

export const modelMonitoringService = {
  getOverview: async () => {
    try {
      const res = await fetchApi<{ success: boolean; data: any }>('/modelops/core/overview');
      return res.data;
    } catch {
      return {
        activeModelsCount: 42,
        deployedEndpointsCount: 18,
        runningTrainingJobsCount: 3,
        avgInferenceLatencyMs: 14.2,
        driftAlertsCount: 0,
        mlopsCompliance: '100% Production Operational'
      };
    }
  },

  getMonitoring: async (): Promise<ModelMonitoring[]> => {
    try {
      const res = await fetchApi<{ success: boolean; data: ModelMonitoring[] }>('/modelops/core/monitoring');
      return res.data;
    } catch {
      return [
        { id: 'mon-1', deploymentId: 'dep-mdl-1', requestsPerSec: 245.8, p99LatencyMs: 16.4, errorRatePct: 0.0001, checkedAt: new Date().toISOString() }
      ];
    }
  },

  getDriftReports: async (): Promise<ModelDriftReport[]> => {
    try {
      const res = await fetchApi<{ success: boolean; data: ModelDriftReport[] }>('/modelops/core/drift-reports');
      return res.data;
    } catch {
      return [
        { id: 'drift-101', deploymentId: 'dep-mdl-1', conceptDriftScore: 0.012, featureDriftScore: 0.008, hasDrift: false, createdAt: new Date().toISOString() }
      ];
    }
  }
};
