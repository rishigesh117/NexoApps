/**
 * Gateway Service — NexoApps Phase 9A
 * Frontend API service for Model Routing, Provider Health, Token Analytics, and Fallback Policies.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const gatewayService = {
  async routeModel(data: any) {
    const res = await fetch(`${API_BASE}/ai-gateway/gateway/route`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async getModelComparison() {
    const res = await fetch(`${API_BASE}/ai-gateway/gateway/comparison`);
    return res.json();
  },

  async getTokenAnalytics() {
    const res = await fetch(`${API_BASE}/ai-gateway/gateway/analytics/tokens`);
    return res.json();
  },

  async getProviderHealthGrid() {
    const res = await fetch(`${API_BASE}/ai-gateway/gateway/health`);
    return res.json();
  },

  async getFallbackPolicies() {
    const res = await fetch(`${API_BASE}/ai-gateway/gateway/fallbacks`);
    return res.json();
  },

  async createFallbackPolicy(data: any) {
    const res = await fetch(`${API_BASE}/ai-gateway/gateway/fallbacks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
};
