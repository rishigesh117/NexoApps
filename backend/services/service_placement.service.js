/**
 * Service Placement Service — NexoApps Phase 12E (v9.5)
 */

class ServicePlacementService {
  constructor() {
    this.bindings = [
      { id: 'sb-1', serviceId: 'gsrv-1', regionId: 'creg-1', replicaCount: 6, routingWeight: 100, status: 'deployed', boundAt: new Date().toISOString() },
      { id: 'sb-2', serviceId: 'gsrv-1', regionId: 'creg-2', replicaCount: 4, routingWeight: 80, status: 'deployed', boundAt: new Date().toISOString() },
      { id: 'sb-3', serviceId: 'gsrv-2', regionId: 'creg-3', replicaCount: 3, routingWeight: 50, status: 'deployed', boundAt: new Date().toISOString() },
    ];
  }

  async getBindings(serviceId) {
    if (serviceId) return this.bindings.filter((b) => b.serviceId === serviceId);
    return this.bindings;
  }

  async bindServiceToRegion(data) {
    const b = {
      id: `sb-${Date.now()}`,
      serviceId: data.serviceId,
      regionId: data.regionId,
      replicaCount: Number(data.replicaCount) || 3,
      routingWeight: Number(data.routingWeight) || 100,
      status: 'deployed',
      boundAt: new Date().toISOString(),
    };
    this.bindings.push(b);
    return b;
  }
}

module.exports = new ServicePlacementService();
