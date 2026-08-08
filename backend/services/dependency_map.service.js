/**
 * Dependency Map Service — NexoApps Phase 12C (v9.3)
 * Build service dependency relationships and provide visual dependency health information.
 */

class DependencyMapService {
  constructor() {
    this.dependencies = [
      {
        id: 'sdep-1',
        sourceServiceId: 'osvc-1', // api-gateway
        targetServiceId: 'osvc-2', // auth-service
        dependencyType: 'http_api',
        healthStatus: 'healthy',
        latencyMs: 12.5,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'sdep-2',
        sourceServiceId: 'osvc-1', // api-gateway
        targetServiceId: 'osvc-3', // ai-reasoning-engine
        dependencyType: 'grpc',
        healthStatus: 'degraded',
        latencyMs: 118.4,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'sdep-3',
        sourceServiceId: 'osvc-1', // api-gateway
        targetServiceId: 'osvc-5', // redis-cache-cluster
        dependencyType: 'redis',
        healthStatus: 'healthy',
        latencyMs: 1.2,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'sdep-4',
        sourceServiceId: 'osvc-2', // auth-service
        targetServiceId: 'osvc-4', // postgresql-primary
        dependencyType: 'database',
        healthStatus: 'healthy',
        latencyMs: 4.8,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'sdep-5',
        sourceServiceId: 'osvc-3', // ai-reasoning-engine
        targetServiceId: 'osvc-4', // postgresql-primary
        dependencyType: 'database',
        healthStatus: 'healthy',
        latencyMs: 6.1,
        createdAt: new Date().toISOString(),
      },
    ];
  }

  async getDependencies() {
    return this.dependencies;
  }

  async getDependencyGraph() {
    // Map dependencies with source and target names
    const serviceMonitorService = require('./service_monitor.service');
    const services = await serviceMonitorService.getServices();
    const serviceMap = {};
    services.forEach((s) => {
      serviceMap[s.id] = s;
    });

    const nodes = services.map((s) => ({
      id: s.id,
      name: s.serviceName,
      type: s.serviceType,
      health: s.healthStatus,
    }));

    const edges = this.dependencies.map((dep) => ({
      id: dep.id,
      source: dep.sourceServiceId,
      sourceName: serviceMap[dep.sourceServiceId]?.serviceName || dep.sourceServiceId,
      target: dep.targetServiceId,
      targetName: serviceMap[dep.targetServiceId]?.serviceName || dep.targetServiceId,
      type: dep.dependencyType,
      health: dep.healthStatus,
      latencyMs: dep.latencyMs,
    }));

    return { nodes, edges };
  }
}

module.exports = new DependencyMapService();
