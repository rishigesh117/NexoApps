import { SystemAlert, ResourceMonitor, HealthCheck } from '../../shared/types';

export const getSystemAlerts = async (): Promise<{ alerts: SystemAlert[]; monitors: ResourceMonitor[] }> => {
  return {
    alerts: [
      { id: 'alt-1', alertTitle: 'Auto-scaled Compute Pool Active', severity: 'info', message: 'Kubernetes autoscaler added 2 replicas to compute pool.', isResolved: true, createdAt: new Date().toISOString() }
    ],
    monitors: [
      { id: 'rm-1', resourceId: 'cluster-k8s-prod', cpuUsagePct: 42.5, memoryUsagePct: 61.2, recordedAt: new Date().toISOString() }
    ]
  };
};

export const getHealthChecks = async (): Promise<HealthCheck[]> => {
  return [
    { id: 'hc-1', endpointName: '/production/core/overview', statusCode: 200, responseTimeMs: 4.2, status: 'healthy', checkedAt: new Date().toISOString() },
    { id: 'hc-2', endpointName: '/collaboration/core/analytics', statusCode: 200, responseTimeMs: 5.1, status: 'healthy', checkedAt: new Date().toISOString() },
    { id: 'hc-3', endpointName: '/enterprise/core/overview', statusCode: 200, responseTimeMs: 3.8, status: 'healthy', checkedAt: new Date().toISOString() }
  ];
};

export const getSystemLogs = async (): Promise<any[]> => {
  return [
    { id: 'log-1', level: 'info', message: 'System startup clean', timestamp: new Date().toISOString() }
  ];
};

export const getServerMetrics = async (): Promise<any> => {
  return { cpu: 42.5, memory: 61.2, activeConnections: 1250, uptimeSeconds: 86400 };
};

