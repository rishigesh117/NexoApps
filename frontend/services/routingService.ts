import { GatewayRoute, GatewayUpstream, UpstreamTarget } from '../../shared/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const routingService = {
  async getRoutes(gatewayId?: string): Promise<GatewayRoute[]> {
    try {
      const query = gatewayId ? `?gatewayId=${gatewayId}` : '';
      const res = await fetch(`${API_BASE}/networking/routes${query}`);
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      return [
        { id: 'groute-1', gatewayId: 'gw-core-01', routePath: '/api/v1/observability/*', methods: 'GET,POST,PUT,DELETE', upstreamId: 'up-obs-core', stripPath: false, status: 'active', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: 'groute-2', gatewayId: 'gw-core-01', routePath: '/api/v1/database-platform/*', methods: 'GET,POST,PUT,DELETE', upstreamId: 'up-db-core', stripPath: false, status: 'active', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      ];
    }
  },

  async getUpstreams(): Promise<GatewayUpstream[]> {
    try {
      const res = await fetch(`${API_BASE}/networking/routes/upstreams`);
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      return [
        { id: 'up-obs-core', gatewayId: 'gw-core-01', upstreamName: 'observability-cluster-upstream', algorithm: 'round_robin', healthCheckPath: '/health', createdAt: new Date().toISOString() },
        { id: 'up-db-core', gatewayId: 'gw-core-01', upstreamName: 'database-platform-upstream', algorithm: 'least_conn', healthCheckPath: '/health', createdAt: new Date().toISOString() },
      ];
    }
  },
};
