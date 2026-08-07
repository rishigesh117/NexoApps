import React from 'react';
import { BarChart3, FileText } from 'lucide-react';

export const InfrastructureReports: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <FileText className="w-6 h-6 text-brand-cyan" /> Database Infrastructure Reports
        </h2>
        <p className="text-text-muted text-sm">Monthly compliance audit logs, backup verification reports & SLA metrics</p>
      </div>

      <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
        <h3 className="font-bold text-white text-base flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-brand-cyan" /> Recovery Validation Summary
        </h3>
        <div className="space-y-2 text-sm text-text-secondary">
          <div className="flex justify-between"><span>Backup Restore Test</span><span className="font-bold text-emerald-400">100% Passed</span></div>
          <div className="flex justify-between"><span>RPO (Recovery Point Objective)</span><span className="font-bold text-white">&lt; 1 Second</span></div>
          <div className="flex justify-between"><span>RTO (Recovery Time Objective)</span><span className="font-bold text-white">&lt; 30 Seconds</span></div>
        </div>
      </div>
    </div>
  );
};
