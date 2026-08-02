/**
 * Usage Metering Service
 * NexoApps Platform - Phase 7A (Version 3.0)
 */

class UsageService {
  getUsageRecords(tenantId) {
    return [
      { id: 'u-1', tenantId: tenantId || 't-1', metricName: 'STORAGE', quantityUsed: 12400, recordedAt: new Date().toISOString() },
      { id: 'u-2', tenantId: tenantId || 't-1', metricName: 'API_REQUESTS', quantityUsed: 48200, recordedAt: new Date().toISOString() },
    ];
  }
}

module.exports = new UsageService();
