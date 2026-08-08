/**
 * WAF Service — NexoApps Phase 12D (v9.4)
 * Web Application Firewall policy management, rule enforcement, threat mitigation.
 */

class WafService {
  constructor() {
    this.policies = [
      {
        id: 'wafpol-1',
        policyName: 'Core Enterprise WAF Protection Policy',
        mode: 'prevention',
        status: 'active',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'wafpol-2',
        policyName: 'AI ModelOps Strict Bot & Scraping Shield',
        mode: 'detection',
        status: 'active',
        createdAt: new Date().toISOString(),
      },
    ];

    this.rules = [
      {
        id: 'wafrule-1',
        wafPolicyId: 'wafpol-1',
        ruleName: 'OWASP SQL Injection Prevention (SQLi)',
        category: 'sqli',
        action: 'block_403',
        isEnabled: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'wafrule-2',
        wafPolicyId: 'wafpol-1',
        ruleName: 'Cross-Site Scripting Mitigation (XSS)',
        category: 'xss',
        action: 'block_403',
        isEnabled: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'wafrule-3',
        wafPolicyId: 'wafpol-2',
        ruleName: 'Automated AI Model Scraping Bot Control',
        category: 'bot_control',
        action: 'challenge',
        isEnabled: true,
        createdAt: new Date().toISOString(),
      },
    ];
  }

  async getPolicies() {
    return this.policies;
  }

  async getRules(policyId) {
    if (policyId) return this.rules.filter((r) => r.wafPolicyId === policyId);
    return this.rules;
  }

  async createPolicy(data) {
    const policy = {
      id: `wafpol-${Date.now()}`,
      policyName: data.policyName,
      mode: data.mode || 'prevention',
      status: 'active',
      createdAt: new Date().toISOString(),
    };
    this.policies.push(policy);
    return policy;
  }
}

module.exports = new WafService();
