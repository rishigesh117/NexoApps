/**
 * Uptime Service — NexoApps Phase 12C (v9.3)
 * Monitor service availability and uptime checks.
 */

class UptimeService {
  constructor() {
    this.checks = [
      {
        id: 'upc-1',
        checkName: 'API Gateway Primary Health HTTP Check',
        targetUrl: 'https://api.nexoapps.internal/health',
        checkIntervalSeconds: 30,
        expectedStatusCode: 200,
        status: 'passing',
        latencyMs: 14.2,
        lastCheckAt: new Date().toISOString(),
      },
      {
        id: 'upc-2',
        checkName: 'Auth Service Token Verify Endpoint',
        targetUrl: 'https://auth.nexoapps.internal/health',
        checkIntervalSeconds: 60,
        expectedStatusCode: 200,
        status: 'passing',
        latencyMs: 18.5,
        lastCheckAt: new Date().toISOString(),
      },
      {
        id: 'upc-3',
        checkName: 'AI Reasoning Worker gRPC Health Endpoint',
        targetUrl: 'https://ai-reasoning.nexoapps.internal/health',
        checkIntervalSeconds: 30,
        expectedStatusCode: 200,
        status: 'degraded',
        latencyMs: 185.0,
        lastCheckAt: new Date().toISOString(),
      },
      {
        id: 'upc-4',
        checkName: 'Database Platform Core API Check',
        targetUrl: 'https://db-platform.nexoapps.internal/health',
        checkIntervalSeconds: 60,
        expectedStatusCode: 200,
        status: 'passing',
        latencyMs: 9.8,
        lastCheckAt: new Date().toISOString(),
      },
    ];
  }

  async getUptimeChecks() {
    return this.checks;
  }

  async createUptimeCheck(data) {
    const newCheck = {
      id: `upc-${Date.now()}`,
      checkName: data.checkName,
      targetUrl: data.targetUrl,
      checkIntervalSeconds: Number(data.checkIntervalSeconds) || 60,
      expectedStatusCode: Number(data.expectedStatusCode) || 200,
      status: 'passing',
      latencyMs: Math.floor(10 + Math.random() * 30),
      lastCheckAt: new Date().toISOString(),
    };
    this.checks.push(newCheck);
    return newCheck;
  }

  async getUptimeStats() {
    const total = this.checks.length;
    const passing = this.checks.filter((c) => c.status === 'passing').length;
    const degraded = this.checks.filter((c) => c.status === 'degraded').length;
    const failing = this.checks.filter((c) => c.status === 'failing').length;

    const overallAvailability = total ? ((passing + degraded * 0.5) / total) * 100 : 100;

    return {
      totalChecks: total,
      passingChecks: passing,
      degradedChecks: degraded,
      failingChecks: failing,
      overallAvailabilityPct: Number(overallAvailability.toFixed(2)),
    };
  }
}

module.exports = new UptimeService();
