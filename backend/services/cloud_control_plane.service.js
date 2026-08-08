/**
 * Cloud Control Plane Orchestrator Service — NexoApps Phase 12E (v9.5)
 */

const cloudRegionService = require('./cloud_region.service');
const cloudProviderService = require('./cloud_provider.service');
const cloudAccountService = require('./cloud_account.service');
const cloudResourceService = require('./cloud_resource.service');
const cloudCostService = require('./cloud_cost.service');
const globalDisasterRecoveryService = require('./global_disaster_recovery.service');

class CloudControlPlaneService {
  async getOverview() {
    const providers = await cloudProviderService.getProviders();
    const accounts = await cloudAccountService.getAccounts();
    const regions = await cloudRegionService.getRegions();
    const resources = await cloudResourceService.getResources();
    const costSummary = await cloudCostService.getCostSummary();
    const drPlans = await globalDisasterRecoveryService.getPlans();

    return {
      version: '9.5.0',
      status: 'operational',
      controlPlaneHealthScore: 100.0,
      providersCount: providers.length,
      accountsCount: accounts.length,
      regionsCount: regions.length,
      resourcesCount: resources.length,
      drPlansCount: drPlans.length,
      costSummary,
      activeRegions: regions,
    };
  }
}

module.exports = new CloudControlPlaneService();
