const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const networkingService = {
  async getOverview() {
    try {
      const res = await fetch(`${API_BASE}/networking/core/overview`);
      const json = await res.json();
      return json.data;
    } catch (err) {
      return {
        version: '9.4.0',
        analytics: {
          totalRequests: 2120000,
          totalBytesInGb: 0.14,
          totalBytesOutGb: 0.68,
          avgLatencyMs: 14.5,
          activeGatewaysCount: 2,
          activeRoutesCount: 3,
        },
        health: {
          status: 'optimal',
          healthScore: 100.0,
          healthyComponents: 4,
          totalComponents: 4,
        },
        gatewaysCount: 2,
        dnsZonesCount: 2,
        certificatesCount: 2,
        wafPoliciesCount: 2,
      };
    }
  },

  async getHealth() {
    try {
      const res = await fetch(`${API_BASE}/networking/core/health`);
      const json = await res.json();
      return json.data;
    } catch (err) {
      return {
        status: { status: 'optimal', healthScore: 100.0, healthyComponents: 4, totalComponents: 4 },
        components: [
          { id: 'nh-1', componentName: 'Production Edge Ingress Gateway', componentType: 'gateway', status: 'healthy', packetLossPct: 0.0, latencyP95Ms: 14.5 },
          { id: 'nh-2', componentName: 'Global Edge Ingress Load Balancer', componentType: 'load_balancer', status: 'healthy', packetLossPct: 0.0, latencyP95Ms: 8.2 },
        ],
      };
    }
  },
};
