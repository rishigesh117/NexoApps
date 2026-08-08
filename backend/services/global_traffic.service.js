/**
 * Global Traffic Service — NexoApps Phase 12E (v9.5)
 */

class GlobalTrafficService {
  constructor() {
    this.rules = [
      { id: 'gtr-1', ruleName: 'Low-Latency Geo-Routing to Nearest Region', routingMode: 'geo_latency', primaryRegionId: 'creg-1', secondaryRegionId: 'creg-2', status: 'active', createdAt: new Date().toISOString() },
      { id: 'gtr-2', ruleName: 'Weighted Multi-Cloud Traffic Split', routingMode: 'weighted', primaryRegionId: 'creg-2', secondaryRegionId: 'creg-3', status: 'active', createdAt: new Date().toISOString() },
    ];
  }

  async getRules() {
    return this.rules;
  }

  async createRule(data) {
    const r = {
      id: `gtr-${Date.now()}`,
      ruleName: data.ruleName,
      routingMode: data.routingMode || 'geo_latency',
      primaryRegionId: data.primaryRegionId || 'creg-1',
      secondaryRegionId: data.secondaryRegionId || 'creg-2',
      status: 'active',
      createdAt: new Date().toISOString(),
    };
    this.rules.push(r);
    return r;
  }
}

module.exports = new GlobalTrafficService();
