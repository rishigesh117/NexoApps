import React, { useEffect, useState } from 'react';
import { DollarSign, CreditCard, PieChart } from 'lucide-react';
import { getEnterpriseCosts } from '../../services/enterpriseCostService';
import { EnterpriseCost as CostType } from '../../../shared/types';

export const EnterpriseCostDashboard: React.FC = () => {
  const [costs, setCosts] = useState<CostType[]>([]);

  useEffect(() => {
    getEnterpriseCosts().then(setCosts);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <CreditCard className="w-6 h-6 text-brand-cyan" /> Enterprise Cost & Financial Governance
        </h2>
        <p className="text-text-muted text-sm">FinOps resource tracking, cost center budgets & GPU cloud spend</p>
      </div>

      <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-4">
        {costs.map((c) => (
          <div key={c.id} className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-white text-sm">{c.costCenter}</h4>
              <p className="text-text-muted text-xs">Allocated Budget: ${c.allocatedBudget.toLocaleString()} USD</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-text-muted uppercase">Actual Spend</span>
              <div className="text-lg font-bold text-brand-cyan">${c.actualSpend.toLocaleString()} USD</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
