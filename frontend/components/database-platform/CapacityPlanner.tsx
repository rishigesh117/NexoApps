import React from 'react';
import { TrendingUp, ShieldCheck } from 'lucide-react';

export const CapacityPlanner: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-brand-cyan" /> Predictive Database Capacity Planner
        </h2>
        <p className="text-text-muted text-sm">Storage growth projection, vacuum overhead analysis & capacity threshold planning</p>
      </div>

      <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
        <h3 className="font-bold text-white text-base flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" /> 90-Day Growth Forecast
        </h3>
        <div className="space-y-2 text-sm text-text-secondary">
          <div className="flex justify-between"><span>Current Database Size</span><span className="font-bold text-white">320 GB</span></div>
          <div className="flex justify-between"><span>Projected 90-Day Growth</span><span className="font-bold text-brand-cyan">+45 GB</span></div>
          <div className="flex justify-between"><span>Storage Threshold Expiry</span><span className="font-bold text-emerald-400">&gt; 18 Months</span></div>
        </div>
      </div>
    </div>
  );
};
