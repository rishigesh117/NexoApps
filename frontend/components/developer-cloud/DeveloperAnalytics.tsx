import React from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';

export const DeveloperAnalytics: React.FC = () => {
  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Engineering DORA Metrics & DevOps Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <span className="text-slate-400 text-sm">Deployment Velocity</span>
          <div className="text-3xl font-bold text-emerald-400 mt-1 mb-1">24 Deployments / Day</div>
          <p className="text-xs text-slate-400">99.9% automated success rate across all environments.</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <span className="text-slate-400 text-sm">MTTR (Mean Time to Recovery)</span>
          <div className="text-3xl font-bold text-cyan-400 mt-1 mb-1">3.2 Minutes</div>
          <p className="text-xs text-slate-400">Automated canary rollback and health probes.</p>
        </div>
      </div>
    </div>
  );
};
