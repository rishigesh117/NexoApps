/**
 * Region Health Service — NexoApps Phase 12E (v9.5)
 */

class RegionHealthService {
  constructor() {
    this.healthStatuses = [
      { id: 'rh-1', regionId: 'creg-1', status: 'healthy', latencyP95Ms: 8.5, errorRatePct: 0.0, recordedAt: new Date().toISOString() },
      { id: 'rh-2', regionId: 'creg-2', status: 'healthy', latencyP95Ms: 14.2, errorRatePct: 0.01, recordedAt: new Date().toISOString() },
      { id: 'rh-3', regionId: 'creg-3', status: 'healthy', latencyP95Ms: 22.0, errorRatePct: 0.0, recordedAt: new Date().toISOString() },
    ];
  }

  async getHealthStatus() {
    return this.healthStatuses;
  }
}

module.exports = new RegionHealthService();
