import React from 'react';
import { AutomationLog } from '../../types';
import { ShieldCheck, AlertCircle, Info, CheckCircle2 } from 'lucide-react';

interface AutomationStatusCardProps {
  logs: AutomationLog[];
}

export const AutomationStatusCard: React.FC<AutomationStatusCardProps> = ({ logs }) => {
  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 text-left">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-brand-cyan" />
          <h3 className="text-base font-bold text-white">Platform Automation Telemetry</h3>
        </div>
        <span className="text-xs text-emerald-400 font-bold font-mono">Status: Active</span>
      </div>

      <div className="space-y-3">
        {logs.map((log) => (
          <div key={log.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-bold text-white">{log.title}</span>
              </div>
              <span className="text-[10px] text-text-muted font-mono">{new Date(log.createdAt).toLocaleString()}</span>
            </div>
            <p className="text-text-secondary leading-relaxed">{log.details}</p>
            <div className="p-2.5 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-[11px] font-medium">
              💡 Recommendation: {log.recommendation}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
