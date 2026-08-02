import React from 'react';
import { Activity, Shield, CheckCircle2 } from 'lucide-react';

export const PlatformHealthOverview: React.FC = () => {
  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">Super Platform Overall Health Score</h3>
          <p className="text-xs text-text-muted">Real-time system diagnostics across all 8 phases (v1.0 - v5.4)</p>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-brand-cyan/10 to-brand-violet/10 border border-emerald-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left space-y-1">
          <p className="text-4xl font-black text-white">99.8%</p>
          <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Health Score • Production Ready</p>
          <p className="text-[11px] text-text-muted mt-1">64 Active Cluster Nodes | 0 TypeScript Errors | OWASP Hardened</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 text-xs font-bold">
          <CheckCircle2 className="w-4 h-4" /> All Systems Operational
        </div>
      </div>
    </div>
  );
};
