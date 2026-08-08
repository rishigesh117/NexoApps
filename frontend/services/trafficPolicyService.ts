import { TrafficPolicy, RateLimitPolicy, ApiPolicy } from '../../shared/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const trafficPolicyService = {
  async getTrafficPolicies(): Promise<TrafficPolicy[]> {
    try {
      const res = await fetch(`${API_BASE}/networking/routes/traffic-policies`);
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      return [
        { id: 'tpol-1', policyName: 'v9.4 Release Canary Deployment Policy (10% Traffic)', policyType: 'canary', trafficSplitPct: 10.0, primaryUpstreamId: 'up-obs-core', secondaryUpstreamId: 'up-modelops', status: 'active', createdAt: new Date().toISOString() },
      ];
    }
  },

  async getRateLimitPolicies(): Promise<RateLimitPolicy[]> {
    try {
      const res = await fetch(`${API_BASE}/networking/routes/rate-limits`);
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      return [
        { id: 'rlp-1', policyName: 'Global Public API Rate Limit (100 req/sec)', requestsPerSecond: 100, burstLimit: 200, scope: 'ip_address', action: 'reject_429', createdAt: new Date().toISOString() },
      ];
    }
  },

  async getApiPolicies(): Promise<ApiPolicy[]> {
    try {
      const res = await fetch(`${API_BASE}/networking/routes/api-policies`);
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      return [
        { id: 'apol-1', policyName: 'JWT Bearer Authentication Enforcement', policyType: 'jwt_validation', isEnabled: true, createdAt: new Date().toISOString() },
        { id: 'apol-2', policyName: 'Global Cross-Origin Resource Sharing (CORS) Policy', policyType: 'cors', isEnabled: true, createdAt: new Date().toISOString() },
      ];
    }
  },
};
