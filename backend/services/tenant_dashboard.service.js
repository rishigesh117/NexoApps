/**
 * Tenant Dashboard Service
 * NexoApps Platform - Phase 7A (Version 3.0)
 */

const tenantService = require('./tenant.service');
const billingService = require('./billing.service');

class TenantDashboardService {
  getTenantDashboard(tenantId) {
    const tenant = tenantService.getTenantBySlug(tenantId);
    const billing = billingService.getBillingOverview(tenantId);
    return { tenant, billing };
  }
}

module.exports = new TenantDashboardService();
