/**
 * Firewall Service — NexoApps Phase 12D (v9.4)
 * Network layer firewall rules, inbound/outbound traffic inspection.
 */

class FirewallService {
  constructor() {
    this.policies = [
      {
        id: 'fw-1',
        policyName: 'HTTPS Inbound Web Traffic (Port 443)',
        direction: 'inbound',
        protocol: 'tcp',
        sourceCidr: '0.0.0.0/0',
        destinationPort: 443,
        action: 'allow',
        priority: 100,
        status: 'active',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'fw-2',
        policyName: 'Internal Microservice Mesh Port (Port 8443)',
        direction: 'inbound',
        protocol: 'tcp',
        sourceCidr: '10.0.0.0/8',
        destinationPort: 8443,
        action: 'allow',
        priority: 10,
        status: 'active',
        createdAt: new Date().toISOString(),
      },
    ];
  }

  async getPolicies() {
    return this.policies;
  }

  async createPolicy(data) {
    const policy = {
      id: `fw-${Date.now()}`,
      policyName: data.policyName,
      direction: data.direction || 'inbound',
      protocol: data.protocol || 'tcp',
      sourceCidr: data.sourceCidr || '0.0.0.0/0',
      destinationPort: Number(data.destinationPort) || 443,
      action: data.action || 'allow',
      priority: Number(data.priority) || 100,
      status: 'active',
      createdAt: new Date().toISOString(),
    };
    this.policies.push(policy);
    return policy;
  }
}

module.exports = new FirewallService();
