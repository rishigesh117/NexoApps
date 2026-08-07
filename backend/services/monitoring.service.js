/**
 * Monitoring Service — NexoApps Phase 12A (v9.1)
 * System alerts, resource monitors, and infrastructure telemetry.
 */

class ProductionMonitoringService {
  constructor() {
    this.alerts = [
      { id: 'alt-1', alertTitle: 'Auto-scaled Compute Pool Active', severity: 'info', message: 'Kubernetes autoscaler added 2 replicas to compute pool.', isResolved: true, createdAt: new Date().toISOString() }
    ];

    this.resourceMonitors = [
      { id: 'rm-1', resourceId: 'cluster-k8s-prod', cpuUsagePct: 42.5, memoryUsagePct: 61.2, recordedAt: new Date().toISOString() }
    ];
  }

  async getAlerts() {
    return this.alerts;
  }

  async getResourceMonitors() {
    return this.resourceMonitors;
  }
}

module.exports = new ProductionMonitoringService();
