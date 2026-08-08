import React, { useEffect, useState } from 'react';
import { DollarSign, TrendingUp } from 'lucide-react';
import { cloudCostService } from '../../services/cloudCostService';
import { InfrastructureRecommendation } from '../../../shared/types';

export const CloudCostDashboard: React.FC = () => {
  const [costData, setCostData] = useState<any>(null);
  const [recs, setRecs] = useState<InfrastructureRecommendation[]>([]);

  useEffect(() => {
    Promise.all([
      cloudCostService.getCostSummary(),
      cloudCostService.getRecommendations(),
    ]).then(([c, r]) => {
      setCostData(c);
      setRecs(r);
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-emerald-400" /> Multi-Cloud Cost Analytics & Optimization
        </h2>
        <span className="text-xs text-text-muted">Budget Utilization: {costData?.budgetUtilizationPct}%</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center font-mono">
        <div className="p-4 rounded-xl glass-panel border border-white/10 bg-white/5">
          <span className="text-[10px] text-text-muted uppercase">Monthly Budget</span>
          <div className="text-2xl font-bold text-white mt-1">${costData?.totalBudgetUsd?.toLocaleString()}</div>
        </div>
        <div className="p-4 rounded-xl glass-panel border border-white/10 bg-white/5">
          <span className="text-[10px] text-text-muted uppercase">Current Spend</span>
          <div className="text-2xl font-bold text-emerald-400 mt-1">${costData?.totalSpendUsd?.toLocaleString()}</div>
        </div>
        <div className="p-4 rounded-xl glass-panel border border-white/10 bg-white/5">
          <span className="text-[10px] text-text-muted uppercase">Forecasted Spend</span>
          <div className="text-2xl font-bold text-purple-400 mt-1">${costData?.totalForecastUsd?.toLocaleString()}</div>
        </div>
      </div>

      <div className="p-4 rounded-xl glass-panel border border-white/10 bg-white/5 space-y-3">
        <h3 className="text-xs font-semibold uppercase text-text-muted">AI Infrastructure Cost Optimization Recommendations</h3>
        <div className="space-y-2">
          {recs.map((r) => (
            <div key={r.id} className="p-3.5 rounded-lg bg-black/20 border border-white/5 flex items-center justify-between text-xs font-mono">
              <div>
                <span className="text-white font-bold">{r.title}</span>
                <div className="text-[10px] text-text-muted">{r.description}</div>
              </div>
              <span className="text-emerald-400 font-bold">+${r.potentialSavingsUsd}/mo</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
