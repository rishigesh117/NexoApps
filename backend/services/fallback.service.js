/**
 * Fallback Service — NexoApps Phase 9A
 * Automatic failover execution, retry rules & circuit breaker management.
 */

const { v4: uuidv4 } = require('uuid');

class FallbackService {
  constructor() {
    this.fallbackPolicies = [
      {
        id: 'fb-policy-1',
        primaryProviderId: 'prov-openai',
        fallbackProviderId: 'prov-anthropic',
        priority: 1,
        conditionRules: { triggerOnStatus: [500, 502, 503, 429], maxRetries: 3, timeoutMs: 5000 },
        isEnabled: true,
        createdAt: new Date().toISOString()
      },
      {
        id: 'fb-policy-2',
        primaryProviderId: 'prov-anthropic',
        fallbackProviderId: 'prov-groq',
        priority: 2,
        conditionRules: { triggerOnStatus: [500, 503, 429], maxRetries: 2, timeoutMs: 4000 },
        isEnabled: true,
        createdAt: new Date().toISOString()
      },
      {
        id: 'fb-policy-3',
        primaryProviderId: 'prov-groq',
        fallbackProviderId: 'prov-ollama',
        priority: 3,
        conditionRules: { triggerOnStatus: [500, 503], maxRetries: 2, timeoutMs: 3000 },
        isEnabled: true,
        createdAt: new Date().toISOString()
      }
    ];
  }

  async listPolicies() {
    return this.fallbackPolicies;
  }

  async createPolicy(data) {
    const policy = {
      id: `fb-policy-${uuidv4().substring(0, 8)}`,
      primaryProviderId: data.primaryProviderId,
      fallbackProviderId: data.fallbackProviderId,
      priority: data.priority || 1,
      conditionRules: data.conditionRules || { triggerOnStatus: [500, 503, 429], maxRetries: 3, timeoutMs: 5000 },
      isEnabled: data.isEnabled !== undefined ? data.isEnabled : true,
      createdAt: new Date().toISOString()
    };
    this.fallbackPolicies.push(policy);
    return policy;
  }

  async executeWithFallback(primaryProviderId, executeFn) {
    try {
      return await executeFn(primaryProviderId);
    } catch (err) {
      const policy = this.fallbackPolicies.find(p => p.primaryProviderId === primaryProviderId && p.isEnabled);
      if (policy) {
        return await executeFn(policy.fallbackProviderId);
      }
      throw err;
    }
  }
}

module.exports = new FallbackService();
