import { CloudCostProfile, InfrastructureRecommendation } from '../../shared/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const cloudCostService = {
  async getCostSummary() {
    try {
      const res = await fetch(`${API_BASE}/cloud-control/cost/summary`);
      const json = await res.json();
      return json.data;
    } catch (err) {
      return {
        currency: 'USD',
        totalBudgetUsd: 15000.0,
        totalSpendUsd: 9540.50,
        totalForecastUsd: 13350.00,
        budgetUtilizationPct: 63.6,
        profiles: [
          { id: 'ccost-1', accountId: 'cacc-1', monthlyBudgetUsd: 10000.0, currentSpendUsd: 6420.50, forecastSpendUsd: 8950.00, currency: 'USD', updatedAt: new Date().toISOString() },
        ],
      };
    }
  },

  async getRecommendations(): Promise<InfrastructureRecommendation[]> {
    try {
      const res = await fetch(`${API_BASE}/cloud-control/cost/recommendations`);
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      return [
        { id: 'irec-1', category: 'cost_optimization', title: 'Rightsize Idle Compute Nodes in us-east-1', description: 'Downsize 4 underutilized t3.2xlarge compute instances to t3.xlarge based on 30-day telemetry.', potentialSavingsUsd: 480.0, confidencePct: 98.0, isDismissed: false, createdAt: new Date().toISOString() },
        { id: 'irec-2', category: 'performance', title: 'Enable Edge Workload Caching in eu-central-1', description: 'Deploy edge-auth-token-validator to EU-WEST-FRA POP to reduce p95 latency by 12ms.', potentialSavingsUsd: 0.0, confidencePct: 95.0, isDismissed: false, createdAt: new Date().toISOString() },
      ];
    }
  },
};
