/**
 * Cloud Cost Service — NexoApps Phase 12E (v9.5)
 */

class CloudCostService {
  constructor() {
    this.profiles = [
      { id: 'ccost-1', accountId: 'cacc-1', monthlyBudgetUsd: 10000.0, currentSpendUsd: 6420.50, forecastSpendUsd: 8950.00, currency: 'USD', updatedAt: new Date().toISOString() },
      { id: 'ccost-2', accountId: 'cacc-2', monthlyBudgetUsd: 5000.0, currentSpendUsd: 3120.00, forecastSpendUsd: 4400.00, currency: 'USD', updatedAt: new Date().toISOString() },
    ];
  }

  async getProfiles() {
    return this.profiles;
  }

  async getCostSummary() {
    const totalBudget = this.profiles.reduce((a, b) => a + b.monthlyBudgetUsd, 0);
    const totalSpend = this.profiles.reduce((a, b) => a + b.currentSpendUsd, 0);
    const totalForecast = this.profiles.reduce((a, b) => a + b.forecastSpendUsd, 0);

    return {
      currency: 'USD',
      totalBudgetUsd: totalBudget,
      totalSpendUsd: totalSpend,
      totalForecastUsd: totalForecast,
      budgetUtilizationPct: Number(((totalSpend / totalBudget) * 100).toFixed(1)),
      profiles: this.profiles,
    };
  }
}

module.exports = new CloudCostService();
