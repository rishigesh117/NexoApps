/**
 * Gateway Analytics Service — NexoApps Phase 12D (v9.4)
 * Gateway request volume, bandwidth throughput, route metrics, error distributions.
 */

class GatewayAnalyticsService {
  constructor() {
    this.metrics = [
      {
        id: 'gwm-1',
        gatewayId: 'gw-core-01',
        requestsPerSec: 1420.0,
        latencyP95Ms: 18.2,
        error5xxPct: 0.01,
        timestamp: new Date().toISOString(),
      },
    ];

    this.trafficStats = [
      {
        id: 'tstat-1',
        region: 'us-east-1',
        bytesIn: 104857600,
        bytesOut: 524288000,
        totalRequests: 1500000,
        recordedAt: new Date().toISOString(),
      },
      {
        id: 'tstat-2',
        region: 'eu-central-1',
        bytesIn: 41943040,
        bytesOut: 209715200,
        totalRequests: 620000,
        recordedAt: new Date().toISOString(),
      },
    ];
  }

  async getMetrics(gatewayId) {
    if (gatewayId) return this.metrics.filter((m) => m.gatewayId === gatewayId);
    return this.metrics;
  }

  async getTrafficStats() {
    return this.trafficStats;
  }

  async getAnalyticsSummary() {
    const totalReq = this.trafficStats.reduce((a, b) => a + b.totalRequests, 0);
    const totalBytesIn = this.trafficStats.reduce((a, b) => a + b.bytesIn, 0);
    const totalBytesOut = this.trafficStats.reduce((a, b) => a + b.bytesOut, 0);

    return {
      version: '9.4.0',
      totalRequests: totalReq,
      totalBytesInGb: Number((totalBytesIn / (1024 * 1024 * 1024)).toFixed(2)),
      totalBytesOutGb: Number((totalBytesOut / (1024 * 1024 * 1024)).toFixed(2)),
      avgLatencyMs: 14.5,
      activeGatewaysCount: 2,
      activeRoutesCount: 3,
      regionalDistribution: this.trafficStats,
    };
  }
}

module.exports = new GatewayAnalyticsService();
