/**
 * API Policy Service — NexoApps Phase 12D (v9.4)
 * JWT Validation, CORS enforcement, header transforms, mock responses.
 */

class ApiPolicyService {
  constructor() {
    this.policies = [
      {
        id: 'apol-1',
        policyName: 'JWT Bearer Authentication Enforcement',
        policyType: 'jwt_validation',
        configuration: JSON.stringify({ issuer: 'https://auth.nexoapps.internal', alg: 'RS256' }),
        isEnabled: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'apol-2',
        policyName: 'Global Cross-Origin Resource Sharing (CORS) Policy',
        policyType: 'cors',
        configuration: JSON.stringify({ allowOrigins: ['*'], allowMethods: ['GET', 'POST', 'PUT', 'DELETE'] }),
        isEnabled: true,
        createdAt: new Date().toISOString(),
      },
    ];
  }

  async getPolicies() {
    return this.policies;
  }

  async createPolicy(data) {
    const policy = {
      id: `apol-${Date.now()}`,
      policyName: data.policyName,
      policyType: data.policyType || 'jwt_validation',
      configuration: data.configuration || '{}',
      isEnabled: true,
      createdAt: new Date().toISOString(),
    };
    this.policies.push(policy);
    return policy;
  }
}

module.exports = new ApiPolicyService();
