import React from 'react';
import { PlatformHealth } from '../../types';
import { Cpu, HardDrive, Zap, CheckCircle2, Server } from 'lucide-react';

interface PlatformHealthPanelProps {
  health?: PlatformHealth;
}

export const PlatformHealthPanel: React.FC<PlatformHealthPanelProps> = ({ health }) => {
  const h = health || {
    status: 'HEALTHY',
    uptimeSeconds: 864000,
    cpuLoad: 18.4,
    memoryUsagePercent: 36.2,
    gpuUsagePercent: 28.5,
    activeDeployments: 4,
    activeAgentsCount: 8,
    requestsPerSec: 420,
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
      <div className="glass-panel p-5 rounded-3xl border border-white/10 space-y-2">
        <div className="flex items-center justify-between text-text-muted text-xs">
          <span>OS Core Status</span>
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        </div>
        <p className="text-2xl font-black text-emerald-400">{h.status}</p>
        <p className="text-[10px] font-mono text-text-muted">Uptime: {(h.uptimeSeconds / 86400).toFixed(1)} Days</p>
      </div>

      <div className="glass-panel p-5 rounded-3xl border border-white/10 space-y-2">
        <div className="flex items-center justify-between text-text-muted text-xs">
          <span>Active Edge Replicas</span>
          <Server className="w-4 h-4 text-brand-cyan" />
        </div>
        <p className="text-2xl font-black text-white">{h.activeDeployments} Pods</p>
        <p className="text-[10px] text-text-muted">{h.requestsPerSec} Req/sec Throughput</p>
      </div>

      <div className="glass-panel p-5 rounded-3xl border border-white/10 space-y-2">
        <div className="flex items-center justify-between text-text-muted text-xs">
          <span>Autonomous Agents</span>
          <Zap className="w-4 h-4 text-amber-400" />
        </div>
        <p className="text-2xl font-black text-white">{h.activeAgentsCount} Agents</p>
        <p className="text-[10px] text-text-muted">Multi-Agent Swarm Active</p>
      </div>

      <div className="glass-panel p-5 rounded-3xl border border-white/10 space-y-2">
        <div className="flex items-center justify-between text-text-muted text-xs">
          <span>GPU / CPU Load</span>
          <Cpu className="w-4 h-4 text-brand-violet" />
        </div>
        <p className="text-2xl font-black text-white">{h.gpuUsagePercent}% GPU</p>
        <p className="text-[10px] text-text-muted">CPU Load: {h.cpuLoad}%</p>
      </div>
    </div>
  );
};
