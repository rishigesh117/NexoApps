/**
 * Network Policy Service — NexoApps Phase 12D (v9.4)
 * Network access policies and CIDR ingress/egress filtering rules.
 */

class NetworkPolicyService {
  constructor() {
    this.policies = [
      {
        id: 'npol-1',
        policyName: 'Allow Internal VPC Ingress Range (10.0.0.0/8)',
        description: 'Allow unrestricted communication between internal microservices',
        action: 'allow',
        cidrBlock: '10.0.0.0/8',
        isActive: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'npol-2',
        policyName: 'Block Suspicious Malicious Subnet Range',
        description: 'Deny ingress traffic from known bad IP ranges',
        action: 'deny',
        cidrBlock: '198.51.100.0/24',
        isActive: true,
        createdAt: new Date().toISOString(),
      },
    ];
  }

  async getPolicies() {
    return this.policies;
  }

  async createPolicy(data) {
    const policy = {
      id: `npol-${Date.now()}`,
      policyName: data.policyName,
      description: data.description || '',
      action: data.action || 'allow',
      cidrBlock: data.cidrBlock || '0.0.0.0/0',
      isActive: true,
      createdAt: new Date().toISOString(),
    };
    this.policies.push(policy);
    return policy;
  }
}

module.exports = new NetworkPolicyService();
