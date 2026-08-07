import React, { useEffect, useState } from 'react';
import { Server, Activity, ShieldCheck, Cpu, HardDrive, Zap, CheckCircle2 } from 'lucide-react';
import { getProductionOverview } from '../../services/productionService';

export const ProductionDashboard: React.FC = () => {
  const [overview, setOverview] = useState<any>(null);

  useEffect(() => {
    getProductionOverview().then(setOverview);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="px-3 py-1 bg-gradient-to-r from-brand-cyan to-brand-violet text-background font-bold text-xs rounded-full uppercase tracking-wider">
            Version 9.1 Production Release
          </span>
          <h1 className="text-2xl font-bold text-white mt-2 flex items-center gap-2">
            <Server className="w-7 h-7 text-brand-cyan" /> Production Infrastructure Platform
          </h1>
          <p className="text-text-muted text-sm mt-1">High-availability cloud infrastructure, distributed caching, queues & telemetry</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
          <span className="text-xs text-text-muted uppercase">Platform Status</span>
          <div className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6" /> Production Ready
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
          <span className="text-xs text-text-muted uppercase">Global Cache Clusters</span>
          <div className="text-2xl font-bold text-white">{overview?.clustersCount || 1} Active</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
          <span className="text-xs text-text-muted uppercase">Message Queues</span>
          <div className="text-2xl font-bold text-white">{overview?.queuesCount || 2} Active</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
          <span className="text-xs text-text-muted uppercase">Uptime SLA</span>
          <div className="text-2xl font-bold text-brand-cyan">99.99%</div>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
        <h3 className="font-bold text-white text-lg flex items-center gap-2">
          <Activity className="w-5 h-5 text-brand-cyan" /> Core Infrastructure Telemetry
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {overview?.metrics?.map((m: any) => (
            <div key={m.id} className="p-4 bg-white/5 rounded-xl border border-white/10">
              <span className="text-xs text-text-muted uppercase">{m.metricName}</span>
              <div className="text-xl font-bold text-white mt-1">{m.metricValue}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
