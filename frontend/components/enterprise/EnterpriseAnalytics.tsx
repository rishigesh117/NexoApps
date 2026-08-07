import React from 'react';
import { BarChart3, TrendingUp, ShieldCheck } from 'lucide-react';

export const EnterpriseAnalytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-brand-cyan" /> Enterprise Global Analytics
        </h2>
        <p className="text-text-muted text-sm">Unified BI metrics across AI OS, Collaboration, DevOps, and Automation</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-brand-cyan" /> Unified Ecosystem Activity
          </h3>
          <div className="space-y-2 text-sm text-text-secondary">
            <div className="flex justify-between"><span>Total Subsystems</span><span className="font-bold text-white">11 Active</span></div>
            <div className="flex justify-between"><span>Daily API Transactions</span><span className="font-bold text-white">1,450,000</span></div>
            <div className="flex justify-between"><span>Global Uptime SLA</span><span className="font-bold text-emerald-400">99.99%</span></div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-purple-400" /> Security & Compliance Telemetry
          </h3>
          <div className="space-y-2 text-sm text-text-secondary">
            <div className="flex justify-between"><span>Zero Trust Policies</span><span className="font-bold text-white">100% Enforced</span></div>
            <div className="flex justify-between"><span>Audit Log Integrity</span><span className="font-bold text-white">Verified SHA-256</span></div>
            <div className="flex justify-between"><span>Vulnerability Count</span><span className="font-bold text-emerald-400">0 Critical</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};
