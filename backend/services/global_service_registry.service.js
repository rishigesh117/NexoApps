/**
 * Global Service Registry Service — NexoApps Phase 12E (v9.5)
 */

class GlobalServiceRegistryService {
  constructor() {
    this.services = [
      { id: 'gsrv-1', serviceName: 'nexoapps-api-gateway', serviceType: 'gateway', version: '9.5.0', status: 'active', createdAt: new Date().toISOString() },
      { id: 'gsrv-2', serviceName: 'nexoapps-ai-modelops-service', serviceType: 'microservice', version: '9.5.0', status: 'active', createdAt: new Date().toISOString() },
      { id: 'gsrv-3', serviceName: 'nexoapps-database-ha-cluster', serviceType: 'database', version: '9.5.0', status: 'active', createdAt: new Date().toISOString() },
    ];
  }

  async getServices() {
    return this.services;
  }

  async registerService(data) {
    const srv = {
      id: `gsrv-${Date.now()}`,
      serviceName: data.serviceName,
      serviceType: data.serviceType || 'microservice',
      version: '9.5.0',
      status: 'active',
      createdAt: new Date().toISOString(),
    };
    this.services.push(srv);
    return srv;
  }
}

module.exports = new GlobalServiceRegistryService();
