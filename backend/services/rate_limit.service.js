/**
 * Rate Limit Service — NexoApps Phase 12D (v9.4)
 * Rate limiting rules, burst limits, client IP / API key scopes.
 */

class RateLimitService {
  constructor() {
    this.policies = [
      {
        id: 'rlp-1',
        policyName: 'Global Public API Rate Limit (100 req/sec)',
        requestsPerSecond: 100,
        burstLimit: 200,
        scope: 'ip_address',
        action: 'reject_429',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'rlp-2',
        policyName: 'Enterprise Tenant Quota Rate Limit (500 req/sec)',
        requestsPerSecond: 500,
        burstLimit: 1000,
        scope: 'tenant',
        action: 'queue_delay',
        createdAt: new Date().toISOString(),
      },
    ];
  }

  async getPolicies() {
    return this.policies;
  }

  async createPolicy(data) {
    const policy = {
      id: `rlp-${Date.now()}`,
      policyName: data.policyName,
      requestsPerSecond: Number(data.requestsPerSecond) || 100,
      burstLimit: Number(data.burstLimit) || 200,
      scope: data.scope || 'ip_address',
      action: data.action || 'reject_429',
      createdAt: new Date().toISOString(),
    };
    this.policies.push(policy);
    return policy;
  }
}

module.exports = new RateLimitService();
