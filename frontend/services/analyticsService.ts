import { fetchApi } from './apiClient';
import { PredictiveModel } from '../../shared/types';

export const analyticsService = {
  getMetrics: async () => {
    try {
      const res = await fetchApi<{ success: boolean; data: any }>('/data-platform/analytics/metrics');
      return res.data;
    } catch {
      return {
        activeDataSources: 12,
        totalPipelines: 28,
        dailyIngestionGb: 450.8,
        dataQualityScorePct: 99.8,
        activeStreamTopics: 8,
        chartData: [
          { day: 'Mon', ingestionGb: 410 },
          { day: 'Tue', ingestionGb: 435 },
          { day: 'Wed', ingestionGb: 480 },
          { day: 'Thu', ingestionGb: 450 },
          { day: 'Fri', ingestionGb: 490 }
        ]
      };
    }
  },

  getPredictiveModels: async (): Promise<PredictiveModel[]> => {
    try {
      const res = await fetchApi<{ success: boolean; data: PredictiveModel[] }>('/data-platform/analytics/predictive-models');
      return res.data;
    } catch {
      return [
        { id: 'pred-1', modelName: 'Customer Churn Predictor v2', targetColumn: 'churn_risk', accuracyPct: 96.4, status: 'deployed', trainedAt: new Date().toISOString() }
      ];
    }
  }
};
