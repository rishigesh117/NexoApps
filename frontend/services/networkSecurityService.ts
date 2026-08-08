import { WafPolicy, WafRule, FirewallPolicy, NetworkPolicy } from '../../shared/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const networkSecurityService = {
  async getWafPolicies(): Promise<WafPolicy[]> {
    try {
      const res = await fetch(`${API_BASE}/networking/security/waf/policies`);
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      return [
        { id: 'wafpol-1', policyName: 'Core Enterprise WAF Protection Policy', mode: 'prevention', status: 'active', createdAt: new Date().toISOString() },
        { id: 'wafpol-2', policyName: 'AI ModelOps Strict Bot Shield', mode: 'detection', status: 'active', createdAt: new Date().toISOString() },
      ];
    }
  },

  async getWafRules(policyId?: string): Promise<WafRule[]> {
    try {
      const query = policyId ? `?policyId=${policyId}` : '';
      const res = await fetch(`${API_BASE}/networking/security/waf/rules${query}`);
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      return [
        { id: 'wafrule-1', wafPolicyId: 'wafpol-1', ruleName: 'OWASP SQL Injection Prevention (SQLi)', category: 'sqli', action: 'block_403', isEnabled: true, createdAt: new Date().toISOString() },
        { id: 'wafrule-2', wafPolicyId: 'wafpol-1', ruleName: 'Cross-Site Scripting Mitigation (XSS)', category: 'xss', action: 'block_403', isEnabled: true, createdAt: new Date().toISOString() },
      ];
    }
  },

  async getFirewallPolicies(): Promise<FirewallPolicy[]> {
    try {
      const res = await fetch(`${API_BASE}/networking/security/firewall/policies`);
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      return [
        { id: 'fw-1', policyName: 'HTTPS Inbound Web Traffic (Port 443)', direction: 'inbound', protocol: 'tcp', sourceCidr: '0.0.0.0/0', destinationPort: 443, action: 'allow', priority: 100, status: 'active', createdAt: new Date().toISOString() },
      ];
    }
  },

  async getNetworkPolicies(): Promise<NetworkPolicy[]> {
    try {
      const res = await fetch(`${API_BASE}/networking/security/network-policies`);
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      return [
        { id: 'npol-1', policyName: 'Allow Internal VPC Ingress Range (10.0.0.0/8)', description: 'Allow internal VPC communication', action: 'allow', cidrBlock: '10.0.0.0/8', isActive: true, createdAt: new Date().toISOString() },
      ];
    }
  },
};
