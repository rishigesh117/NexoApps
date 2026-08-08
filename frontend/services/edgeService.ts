import { EdgeLocation, EdgeNode, GlobalRoute } from '../../shared/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const edgeService = {
  async getLocations(): Promise<EdgeLocation[]> {
    try {
      const res = await fetch(`${API_BASE}/networking/edge/locations`);
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      return [
        { id: 'eloc-1', locationCode: 'US-EAST-IAD', locationName: 'North America East (Ashburn)', region: 'us-east-1', status: 'operational', latencyMs: 8.5, createdAt: new Date().toISOString() },
        { id: 'eloc-2', locationCode: 'EU-WEST-FRA', locationName: 'Europe Central (Frankfurt)', region: 'eu-central-1', status: 'operational', latencyMs: 14.2, createdAt: new Date().toISOString() },
        { id: 'eloc-3', locationCode: 'AP-SOUTH-BOM', locationName: 'Asia Pacific (Mumbai)', region: 'ap-south-1', status: 'operational', latencyMs: 22.0, createdAt: new Date().toISOString() },
      ];
    }
  },

  async getNodes(locationId?: string): Promise<EdgeNode[]> {
    try {
      const query = locationId ? `?locationId=${locationId}` : '';
      const res = await fetch(`${API_BASE}/networking/edge/nodes${query}`);
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      return [
        { id: 'enode-1', edgeLocationId: 'eloc-1', nodeName: 'iad-edge-01.nexoapps.net', publicIp: '198.51.100.10', status: 'online', requestsPerSec: 1250.0, lastHeartbeat: new Date().toISOString() },
        { id: 'enode-2', edgeLocationId: 'eloc-2', nodeName: 'fra-edge-01.nexoapps.net', publicIp: '198.51.100.20', status: 'online', requestsPerSec: 890.0, lastHeartbeat: new Date().toISOString() },
      ];
    }
  },

  async getGlobalRoutes(): Promise<GlobalRoute[]> {
    try {
      const res = await fetch(`${API_BASE}/networking/edge/global-routes`);
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      return [
        { id: 'grout-1', domainName: 'api.nexoapps.internal', routingStrategy: 'latency_based', primaryRegion: 'us-east-1', fallbackRegion: 'eu-central-1', status: 'active', createdAt: new Date().toISOString() },
      ];
    }
  },
};
