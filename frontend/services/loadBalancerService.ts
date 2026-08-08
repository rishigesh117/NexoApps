import { LoadBalancer, LoadBalancerTarget } from '../../shared/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const loadBalancerService = {
  async getLoadBalancers(): Promise<LoadBalancer[]> {
    try {
      const res = await fetch(`${API_BASE}/networking/load-balancers`);
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      return [
        { id: 'lb-ext-01', name: 'Global Edge Ingress Layer 7 Load Balancer', type: 'layer_7', algorithm: 'round_robin', virtualIp: '198.51.100.1', status: 'active', createdAt: new Date().toISOString() },
        { id: 'lb-int-02', name: 'Internal Database & Cache Layer 4 Load Balancer', type: 'layer_4', algorithm: 'least_connections', virtualIp: '10.0.0.100', status: 'active', createdAt: new Date().toISOString() },
      ];
    }
  },

  async getTargets(loadBalancerId?: string): Promise<LoadBalancerTarget[]> {
    try {
      const query = loadBalancerId ? `?loadBalancerId=${loadBalancerId}` : '';
      const res = await fetch(`${API_BASE}/networking/load-balancers/targets${query}`);
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      return [
        { id: 'lbt-1', loadBalancerId: 'lb-ext-01', targetIp: '10.0.10.12', targetPort: 8443, weight: 10, healthStatus: 'healthy' },
        { id: 'lbt-2', loadBalancerId: 'lb-ext-01', targetIp: '10.0.10.13', targetPort: 8443, weight: 10, healthStatus: 'healthy' },
      ];
    }
  },
};
