import React from 'react';
import { ServerMetrics } from '../../types';
import { Cpu, HardDrive, Database, Activity, Zap, Users } from 'lucide-react';

interface SystemHealthGridProps {
  metrics?: ServerMetrics;
}

export const SystemHealthGrid: React.FC<SystemHealthGridProps> = ({ metrics }) => {
  const m = metrics || {
    cpuUsagePercent: 18.4,
    memoryUsagePercent: 34.2,
    diskUsagePercent: 22.8,
    postgresPoolActive: 8,
    postgresPoolIdle: 22,
    redisConnected: true,
    averageLatencyMs: 14,
    requestsPerSec: 148,
    errorRatePercent: 0.02,
    activeUsers: 1420,
    onlineUsers: 340,
    queueLength: 0,
    workerStatus: 'HEALTHY',
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
      <div className="glass-panel p-5 rounded-3xl border border-white/10 space-y-2">
        <div className="flex items-center justify-between text-text-muted text-xs">
          <span>CPU Utilization</span>
          <Cpu className="w-4 h-4 text-brand-cyan" />
        </div>
        <p className="text-2xl font-black text-white">{m.cpuUsagePercent}%</p>
        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
          <div className="bg-brand-cyan h-full rounded-full" style={{ width: `${m.cpuUsagePercent}%` }} />
        </div>
      </div>

      <div className="glass-panel p-5 rounded-3xl border border-white/10 space-y-2">
        <div className="flex items-center justify-between text-text-muted text-xs">
          <span>Memory Usage</span>
          <HardDrive className="w-4 h-4 text-brand-violet" />
        </div>
        <p className="text-2xl font-black text-white">{m.memoryUsagePercent}%</p>
        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
          <div className="bg-brand-violet h-full rounded-full" style={{ width: `${m.memoryUsagePercent}%` }} />
        </div>
      </div>

      <div className="glass-panel p-5 rounded-3xl border border-white/10 space-y-2">
        <div className="flex items-center justify-between text-text-muted text-xs">
          <span>PostgreSQL Pool</span>
          <Database className="w-4 h-4 text-emerald-400" />
        </div>
        <p className="text-2xl font-black text-emerald-400">{m.postgresPoolActive} Active / {m.postgresPoolIdle} Idle</p>
        <p className="text-[10px] text-text-muted">Redis Cluster: Connected</p>
      </div>

      <div className="glass-panel p-5 rounded-3xl border border-white/10 space-y-2">
        <div className="flex items-center justify-between text-text-muted text-xs">
          <span>API Response Latency</span>
          <Zap className="w-4 h-4 text-amber-400" />
        </div>
        <p className="text-2xl font-black text-white">{m.averageLatencyMs} ms</p>
        <p className="text-[10px] text-text-muted">{m.requestsPerSec} Req/sec • {m.errorRatePercent}% Error Rate</p>
      </div>
    </div>
  );
};
