/**
 * Gateway Instance Service — NexoApps Phase 12D (v9.4)
 * Gateway instance nodes and heartbeat tracking.
 */

class GatewayInstanceService {
  constructor() {
    this.instances = [
      {
        id: 'gw-inst-1',
        gatewayId: 'gw-core-01',
        instanceName: 'edge-gateway-us-east-1a',
        hostIp: '10.0.10.12',
        port: 8443,
        region: 'us-east-1',
        status: 'online',
        startedAt: new Date().toISOString(),
        lastHeartbeat: new Date().toISOString(),
      },
      {
        id: 'gw-inst-2',
        gatewayId: 'gw-core-01',
        instanceName: 'edge-gateway-us-east-1b',
        hostIp: '10.0.10.13',
        port: 8443,
        region: 'us-east-1',
        status: 'online',
        startedAt: new Date().toISOString(),
        lastHeartbeat: new Date().toISOString(),
      },
      {
        id: 'gw-inst-3',
        gatewayId: 'gw-mesh-02',
        instanceName: 'mesh-gateway-eu-west-1a',
        hostIp: '10.0.20.15',
        port: 8443,
        region: 'eu-west-1',
        status: 'online',
        startedAt: new Date().toISOString(),
        lastHeartbeat: new Date().toISOString(),
      },
    ];
  }

  async getInstances(gatewayId) {
    if (gatewayId) {
      return this.instances.filter((i) => i.gatewayId === gatewayId);
    }
    return this.instances;
  }

  async registerInstance(data) {
    const inst = {
      id: `gw-inst-${Date.now()}`,
      gatewayId: data.gatewayId || 'gw-core-01',
      instanceName: data.instanceName,
      hostIp: data.hostIp || '127.0.0.1',
      port: Number(data.port) || 8443,
      region: data.region || 'us-east-1',
      status: 'online',
      startedAt: new Date().toISOString(),
      lastHeartbeat: new Date().toISOString(),
    };
    this.instances.push(inst);
    return inst;
  }
}

module.exports = new GatewayInstanceService();
