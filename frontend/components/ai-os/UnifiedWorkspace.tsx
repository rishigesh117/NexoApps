import React from 'react';
import { Cpu, ShieldCheck, Sparkles, Activity, Layers, Store, Terminal } from 'lucide-react';
import { Workspace } from '../../../shared/types';

interface UnifiedWorkspaceProps {
  workspace: Workspace;
}

export const UnifiedWorkspace: React.FC<UnifiedWorkspaceProps> = ({ workspace }) => {
  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-cyan via-brand-blue to-brand-violet p-0.5 shadow-glow-cyan">
            <div className="w-full h-full bg-background rounded-[14px] flex items-center justify-center">
              <Cpu className="w-6 h-6 text-brand-cyan" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              {workspace.workspaceName}
              <span className="text-xs px-3 py-0.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan font-mono">
                AI OS v7.0
              </span>
            </h2>
            <p className="text-xs text-text-muted mt-0.5">Central Intelligent Digital Ecosystem</p>
          </div>
        </div>

        <span className="text-xs font-bold px-3.5 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4" /> System Status: OPERATIONAL
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-surface-100/80 border border-white/10">
          <span className="text-[10px] font-bold text-text-muted uppercase">Active Modules</span>
          <h4 className="text-2xl font-extrabold text-brand-cyan mt-1">14 Subsystems</h4>
        </div>
        <div className="p-4 rounded-2xl bg-surface-100/80 border border-white/10">
          <span className="text-[10px] font-bold text-text-muted uppercase">Global Health</span>
          <h4 className="text-2xl font-extrabold text-emerald-400 mt-1">99.99% Uptime</h4>
        </div>
        <div className="p-4 rounded-2xl bg-surface-100/80 border border-white/10">
          <span className="text-[10px] font-bold text-text-muted uppercase">Average Latency</span>
          <h4 className="text-2xl font-extrabold text-brand-violet mt-1">14.2 ms</h4>
        </div>
        <div className="p-4 rounded-2xl bg-surface-100/80 border border-white/10">
          <span className="text-[10px] font-bold text-text-muted uppercase">Cross-Module Events</span>
          <h4 className="text-2xl font-extrabold text-amber-400 mt-1">142.5K / day</h4>
        </div>
      </div>
    </div>
  );
};
