import { PerformanceMetric, HealthCheck, AutoscalingPolicy, ServiceDiscovery } from '../../shared/types';

export const getProductionOverview = async () => {
  return {
    version: '9.1.0',
    status: 'production_ready',
    clustersCount: 1,
    queuesCount: 2,
    jobsCount: 2,
    metrics: [
      { id: 'pm-1', metricName: 'API Latency P95 (ms)', metricValue: 12.4, recordedAt: new Date().toISOString() },
      { id: 'pm-2', metricName: 'API Latency P99 (ms)', metricValue: 24.8, recordedAt: new Date().toISOString() },
      { id: 'pm-3', metricName: 'Throughput (RPS)', metricValue: 3450.0, recordedAt: new Date().toISOString() }
    ] as PerformanceMetric[],
    health: [
      { id: 'hc-1', endpointName: '/production/core/overview', statusCode: 200, responseTimeMs: 4.2, status: 'healthy', checkedAt: new Date().toISOString() }
    ] as HealthCheck[]
  };
};

export const getAutoscalingPolicies = async (): Promise<AutoscalingPolicy[]> => {
  return [
    { id: 'asp-1', policyName: 'Production API Pod Autoscaler', minReplicas: 3, maxReplicas: 30, cpuThresholdPct: 75.0, createdAt: new Date().toISOString() }
  ];
};

export const getServiceDiscovery = async (): Promise<ServiceDiscovery[]> => {
  return [
    { id: 'sd-1', serviceName: 'ai-os-kernel-service', instanceIp: '10.0.2.14', port: 8080, status: 'online' },
    { id: 'sd-2', serviceName: 'collaboration-messaging-service', instanceIp: '10.0.2.15', port: 8081, status: 'online' }
  ];
};
