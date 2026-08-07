import { PerformanceMetric } from '../../shared/types';

export const getPerformanceMetrics = async (): Promise<PerformanceMetric[]> => {
  return [
    { id: 'pm-1', metricName: 'API Latency P95 (ms)', metricValue: 12.4, recordedAt: new Date().toISOString() },
    { id: 'pm-2', metricName: 'API Latency P99 (ms)', metricValue: 24.8, recordedAt: new Date().toISOString() },
    { id: 'pm-3', metricName: 'Throughput (RPS)', metricValue: 3450.0, recordedAt: new Date().toISOString() }
  ];
};
