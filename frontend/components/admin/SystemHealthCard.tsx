import React from 'react';
import { SystemHealthStatus } from '../../types';
import { Activity, Server, Database, Cpu, HardDrive, RefreshCw } from 'lucide-react';

interface SystemHealthCardProps {
  health: SystemHealthStatus;
}

export const SystemHealthCard: React.FC<SystemHealthCardProps> = ({ health }) => {
  const formatUptime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${hrs}h ${mins}m`;
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 text-left">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-400" />
          <h3 className="text-base font-bold text-white">Platform System Health</h3>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {health.serverStatus}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
          <div className="flex items-center gap-1.5 text-text-muted">
            <Server className="w-3.5 h-3.5 text-brand-cyan" />
            <span className="text-[10px] uppercase tracking-wider font-semibold">Uptime</span>
          </div>
          <p className="font-bold text-white text-sm">{formatUptime(health.uptimeSeconds)}</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
          <div className="flex items-center gap-1.5 text-text-muted">
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[10px] uppercase tracking-wider font-semibold">Database</span>
          </div>
          <p className="font-bold text-emerald-400 text-sm">{health.databaseStatus}</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
          <div className="flex items-center gap-1.5 text-text-muted">
            <HardDrive className="w-3.5 h-3.5 text-brand-violet" />
            <span className="text-[10px] uppercase tracking-wider font-semibold">RAM Usage</span>
          </div>
          <p className="font-bold text-white text-sm">{health.memoryUsageMb} MB</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
          <div className="flex items-center gap-1.5 text-text-muted">
            <Cpu className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[10px] uppercase tracking-wider font-semibold">CPU Load</span>
          </div>
          <p className="font-bold text-white text-sm">{health.cpuLoadPercentage}%</p>
        </div>
      </div>
    </div>
  );
};
