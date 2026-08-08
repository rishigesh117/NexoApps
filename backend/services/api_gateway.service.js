/**
 * API Gateway Service — NexoApps Phase 12D (v9.4)
 * Gateway lifecycle management, configuration, status, and instances.
 */

class ApiGatewayService {
  constructor() {
    this.gateways = [
      {
        id: 'gw-core-01',
        gatewayName: 'Production Edge Ingress Gateway',
        environment: 'production',
        listenPort: 443,
        status: 'active',
        mode: 'reverse_proxy',
        version: '9.4.0',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'gw-mesh-02',
        gatewayName: 'AI ModelOps Internal Service Mesh Gateway',
        environment: 'production',
        listenPort: 8443,
        status: 'active',
        mode: 'api_mesh',
        version: '9.4.0',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
  }

  async getGateways() {
    return this.gateways;
  }

  async getGatewayById(id) {
    return this.gateways.find((g) => g.id === id) || null;
  }

  async createGateway(data) {
    const gw = {
      id: `gw-${Date.now()}`,
      gatewayName: data.gatewayName,
      environment: data.environment || 'production',
      listenPort: Number(data.listenPort) || 443,
      status: 'active',
      mode: data.mode || 'reverse_proxy',
      version: '9.4.0',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.gateways.push(gw);
    return gw;
  }

  async updateGateway(id, data) {
    const idx = this.gateways.findIndex((g) => g.id === id);
    if (idx === -1) return null;
    this.gateways[idx] = { ...this.gateways[idx], ...data, updatedAt: new Date().toISOString() };
    return this.gateways[idx];
  }
}

module.exports = new ApiGatewayService();
