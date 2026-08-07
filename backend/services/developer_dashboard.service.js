/**
 * Developer Dashboard Service — NexoApps Phase 11A (v8.1)
 * Engineering metrics, DORA metrics (Deployment Frequency, Lead Time, CFR, MTTR).
 */

class DeveloperDashboardService {
  async getOverview() {
    return {
      deploymentFrequency: '24 / day',
      leadTimeForChanges: '14 mins',
      changeFailureRate: '0.01%',
      meanTimeToRecovery: '3 mins',
      activePipelinesCount: 18,
      activeRunnersCount: 12
    };
  }
}

module.exports = new DeveloperDashboardService();
