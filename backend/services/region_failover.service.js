/**
 * Region Failover Service — NexoApps Phase 12E (v9.5)
 */

class RegionFailoverService {
  constructor() {
    this.policies = [
      { id: 'rfp-1', policyName: 'Automated US East -> EU Central Failover Policy', primaryRegionId: 'creg-1', failoverRegionId: 'creg-2', healthThresholdPct: 90.0, autoFailover: true, status: 'active', createdAt: new Date().toISOString() },
      { id: 'rfp-2', policyName: 'Asia Pacific Standby Failover Policy', primaryRegionId: 'creg-3', failoverRegionId: 'creg-1', healthThresholdPct: 85.0, autoFailover: false, status: 'active', createdAt: new Date().toISOString() },
    ];
  }

  async getPolicies() {
    return this.policies;
  }

  async createPolicy(data) {
    const p = {
      id: `rfp-${Date.now()}`,
      policyName: data.policyName,
      primaryRegionId: data.primaryRegionId || 'creg-1',
      failoverRegionId: data.failoverRegionId || 'creg-2',
      healthThresholdPct: Number(data.healthThresholdPct) || 90.0,
      autoFailover: !!data.autoFailover,
      status: 'active',
      createdAt: new Date().toISOString(),
    };
    this.policies.push(p);
    return p;
  }
}

module.exports = new RegionFailoverService();
