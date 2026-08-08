/**
 * Global Disaster Recovery Service — NexoApps Phase 12E (v9.5)
 */

class GlobalDisasterRecoveryService {
  constructor() {
    this.plans = [
      { id: 'drp-1', planName: 'Production Core VPC Active-Passive Regional DR Plan', primaryRegionId: 'creg-1', drRegionId: 'creg-2', rpoSeconds: 60, rtoMinutes: 15, status: 'ready', createdAt: new Date().toISOString() },
      { id: 'drp-2', planName: 'AI ModelOps Cross-Cloud Database DR Backup Plan', primaryRegionId: 'creg-2', drRegionId: 'creg-3', rpoSeconds: 300, rtoMinutes: 30, status: 'ready', createdAt: new Date().toISOString() },
    ];

    this.executions = [
      { id: 'drex-1', planId: 'drp-1', executionType: 'drill', status: 'completed', startedAt: new Date(Date.now() - 86400000).toISOString(), completedAt: new Date(Date.now() - 85500000).toISOString() },
    ];
  }

  async getPlans() {
    return this.plans;
  }

  async getExecutions(planId) {
    if (planId) return this.executions.filter((e) => e.planId === planId);
    return this.executions;
  }

  async triggerDrill(planId) {
    const ex = {
      id: `drex-${Date.now()}`,
      planId: planId || 'drp-1',
      executionType: 'drill',
      status: 'completed',
      startedAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
    };
    this.executions.push(ex);
    return ex;
  }
}

module.exports = new GlobalDisasterRecoveryService();
