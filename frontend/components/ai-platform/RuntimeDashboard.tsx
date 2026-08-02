import React from 'react';
import { RuntimeLog } from '../../types';
import { Cpu, HardDrive, Zap, Activity } from 'lucide-react';

interface RuntimeDashboardProps {
  telemetry?: RuntimeLog;
}

export const RuntimeDashboard: React.FC<RuntimeDashboardProps> = ({ telemetry }) => {
  const t = telemetry || {
    serviceName: 'Inference Engine Cluster',
    cpuPercent: 24.5,
    memoryPercent: 42.1,
    gpuPercent: 38.0,
    requestsPerSec: 340,
    timestamp: new Date().toISOString(),
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
      <div className="glass-panel p-5 rounded-3xl border border-white/10 space-y-2">
        <div className="flex items-center justify-between text-text-muted text-xs">
          <span>GPU Compute Load</span>
          <Zap className="w-4 h-4 text-brand-cyan" />
        </div>
        <p className="text-2xl font-black text-white">{t.gpuPercent}%</p>
        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
          <div className="bg-brand-cyan h-full rounded-full" style={{ width: `${t.gpuPercent}%` }} />
        </div>
      </div>

      <div className="glass-panel p-5 rounded-3xl border border-white/10 space-y-2">
        <div className="flex items-center justify-between text-text-muted text-xs">
          <span>CPU Utilization</span>
          <Cpu className="w-4 h-4 text-brand-violet" />
        </div>
        <p className="text-2xl font-black text-white">{t.cpuPercent}%</p>
        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
          <div className="bg-brand-violet h-full rounded-full" style={{ width: `${t.cpuPercent}%` }} />
        </div>
      </div>

      <div className="glass-panel p-5 rounded-3xl border border-white/10 space-y-2">
        <div className="flex items-center justify-between text-text-muted text-xs">
          <span>VRAM / Memory Load</span>
          <HardDrive className="w-4 h-4 text-emerald-400" />
        </div>
        <p className="text-2xl font-black text-white">{t.memoryPercent}%</p>
        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
          <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${t.memoryPercent}%` }} />
        </div>
      </div>

      <div className="glass-panel p-5 rounded-3xl border border-white/10 space-y-2">
        <div className="flex items-center justify-between text-text-muted text-xs">
          <span>Inference Throughput</span>
          <Activity className="w-4 h-4 text-amber-400" />
        </div>
        <p className="text-2xl font-black text-white">{t.requestsPerSec} Req/sec</p>
        <p className="text-[10px] text-text-muted">Edge Cluster Status: Healthy</p>
      </div>
    </div>
  );
};
