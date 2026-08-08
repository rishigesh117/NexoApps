/**
 * Service Monitor Service — NexoApps Phase 12C (v9.3)
 * Track services, instances, status, availability, and health.
 */

class ServiceMonitorService {
  constructor() {
    this.services = [
      {
        id: 'osvc-1',
        projectId: 'oproj-1',
        serviceName: 'api-gateway',
        serviceType: 'microservice',
        language: 'nodejs',
        healthStatus: 'healthy',
        version: '9.3.0',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'osvc-2',
        projectId: 'oproj-1',
        serviceName: 'auth-service',
        serviceType: 'microservice',
        language: 'nodejs',
        healthStatus: 'healthy',
        version: '9.3.0',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'osvc-3',
        projectId: 'oproj-1',
        serviceName: 'ai-reasoning-engine',
        serviceType: 'microservice',
        language: 'python',
        healthStatus: 'degraded',
        version: '9.2.1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'osvc-4',
        projectId: 'oproj-1',
        serviceName: 'postgresql-primary',
        serviceType: 'database',
        language: 'sql',
        healthStatus: 'healthy',
        version: '16.2',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'osvc-5',
        projectId: 'oproj-1',
        serviceName: 'redis-cache-cluster',
        serviceType: 'cache',
        language: 'c',
        healthStatus: 'healthy',
        version: '7.2.4',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    this.instances = [
      {
        id: 'sinst-1',
        serviceId: 'osvc-1',
        instanceName: 'api-gateway-01',
        hostIp: '10.0.1.5',
        port: 8080,
        status: 'online',
        startedAt: new Date().toISOString(),
        lastHeartbeat: new Date().toISOString(),
      },
      {
        id: 'sinst-2',
        serviceId: 'osvc-1',
        instanceName: 'api-gateway-02',
        hostIp: '10.0.1.6',
        port: 8080,
        status: 'online',
        startedAt: new Date().toISOString(),
        lastHeartbeat: new Date().toISOString(),
      },
      {
        id: 'sinst-3',
        serviceId: 'osvc-3',
        instanceName: 'ai-reasoning-worker-01',
        hostIp: '10.0.2.12',
        port: 50051,
        status: 'unhealthy',
        startedAt: new Date().toISOString(),
        lastHeartbeat: new Date().toISOString(),
      },
    ];
  }

  async getServices(projectId) {
    if (projectId) {
      return this.services.filter((s) => s.projectId === projectId);
    }
    return this.services;
  }

  async getServiceById(id) {
    const service = this.services.find((s) => s.id === id);
    if (!service) return null;
    const instances = this.instances.filter((inst) => inst.serviceId === id);
    return { ...service, instances };
  }

  async getInstances(serviceId) {
    if (serviceId) {
      return this.instances.filter((inst) => inst.serviceId === serviceId);
    }
    return this.instances;
  }

  async registerService(data) {
    const newService = {
      id: `osvc-${Date.now()}`,
      projectId: data.projectId || 'oproj-1',
      serviceName: data.serviceName,
      serviceType: data.serviceType || 'microservice',
      language: data.language || 'nodejs',
      healthStatus: data.healthStatus || 'healthy',
      version: data.version || '1.0.0',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.services.push(newService);
    return newService;
  }
}

module.exports = new ServiceMonitorService();
