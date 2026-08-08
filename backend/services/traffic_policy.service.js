/**
 * Traffic Policy Service — NexoApps Phase 12D (v9.4)
 * Traffic distribution, canary splits, blue-green deployment routing.
 */

class TrafficPolicyService {
  constructor() {
    this.trafficPolicies = [
      {
        id: 'tpol-1',
        policyName: 'v9.4 Release Canary Deployment Policy (10% Traffic)',
        policyType: 'canary',
        trafficSplitPct: 10.0,
        primaryUpstreamId: 'up-obs-core',
        secondaryUpstreamId: 'up-modelops',
        status: 'active',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'tpol-2',
        policyName: 'Blue-Green Failover Mirror Policy',
        policyType: 'blue_green',
        trafficSplitPct: 50.0,
        primaryUpstreamId: 'up-db-core',
        secondaryUpstreamId: 'up-obs-core',
        status: 'paused',
        createdAt: new Date().toISOString(),
      },
    ];
  }

  async getTrafficPolicies() {
    return this.trafficPolicies;
  }

  async createTrafficPolicy(data) {
    const policy = {
      id: `tpol-${Date.now()}`,
      policyName: data.policyName,
      policyType: data.policyType || 'canary',
      trafficSplitPct: Number(data.trafficSplitPct) || 10.0,
      primaryUpstreamId: data.primaryUpstreamId || null,
      secondaryUpstreamId: data.secondaryUpstreamId || null,
      status: 'active',
      createdAt: new Date().toISOString(),
    };
    this.trafficPolicies.push(policy);
    return policy;
  }
}

module.exports = new TrafficPolicyService();
