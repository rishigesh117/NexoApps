import { GatewayMetric, TrafficStatistic } from '../../shared/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const networkAnalyticsService = {
  async getAnalytics() {
    try {
      const res = await fetch(`${API_BASE}/networking/core/analytics`);
      const json = await res.json();
      return json.data;
    } catch (err) {
      return {
        summary: {
          version: '9.4.0',
          totalRequests: 2120000,
          totalBytesInGb: 0.14,
          totalBytesOutGb: 0.68,
          avgLatencyMs: 14.5,
          activeGatewaysCount: 2,
          activeRoutesCount: 3,
        },
        metrics: [
          { id: 'gwm-1', gatewayId: 'gw-core-01', requestsPerSec: 1420.0, latencyP95Ms: 18.2, error5xxPct: 0.01, timestamp: new Date().toISOString() },
        ],
        stats: [
          { id: 'tstat-1', region: 'us-east-1', bytesIn: 104857600, bytesOut: 524288000, totalRequests: 1500000, recordedAt: new Date().toISOString() },
          { id: 'tstat-2', region: 'eu-central-1', bytesIn: 41943040, bytesOut: 209715200, totalRequests: 620000, recordedAt: new Date().toISOString() },
        ],
      };
    }
  },
};
