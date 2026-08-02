/**
 * API Rate Limiting Service
 * NexoApps Platform - Phase 7B (Version 3.1)
 */

class RateLimitService {
  getRateLimits() {
    return [
      { id: 'rl-free', tierName: 'FREE', requestsPerMinute: 60, requestsPerDay: 5000 },
      { id: 'rl-pro', tierName: 'PROFESSIONAL', requestsPerMinute: 1000, requestsPerDay: 250000 },
      { id: 'rl-ent', tierName: 'ENTERPRISE', requestsPerMinute: 10000, requestsPerDay: 5000000 },
    ];
  }
}

module.exports = new RateLimitService();
