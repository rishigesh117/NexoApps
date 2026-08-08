import { GlobalTrafficRule, RegionFailoverPolicy, GlobalServiceRegistry, ServiceRegionBinding } from '../../shared/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const globalTrafficService = {
  async getRules(): Promise<GlobalTrafficRule[]> {
    try {
      const res = await fetch(`${API_BASE}/cloud-control/global-traffic/rules`);
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      return [
        { id: 'gtr-1', ruleName: 'Low-Latency Geo-Routing to Nearest Region', routingMode: 'geo_latency', primaryRegionId: 'creg-1', secondaryRegionId: 'creg-2', status: 'active', createdAt: new Date().toISOString() },
      ];
    }
  },

  async getFailoverPolicies(): Promise<RegionFailoverPolicy[]> {
    try {
      const res = await fetch(`${API_BASE}/cloud-control/global-traffic/failover-policies`);
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      return [
        { id: 'rfp-1', policyName: 'Automated US East -> EU Central Failover Policy', primaryRegionId: 'creg-1', failoverRegionId: 'creg-2', healthThresholdPct: 90.0, autoFailover: true, status: 'active', createdAt: new Date().toISOString() },
      ];
    }
  },

  async getServices(): Promise<GlobalServiceRegistry[]> {
    try {
      const res = await fetch(`${API_BASE}/cloud-control/global-traffic/services`);
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      return [
        { id: 'gsrv-1', serviceName: 'nexoapps-api-gateway', serviceType: 'gateway', version: '9.5.0', status: 'active', createdAt: new Date().toISOString() },
      ];
    }
  },
};
