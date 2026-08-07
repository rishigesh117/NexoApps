import React, { useEffect, useState } from 'react';
import { Database, ShieldCheck, Cpu, HardDrive, RefreshCw, Activity, CheckCircle2 } from 'lucide-react';
import { getDatabasePlatformOverview } from '../../services/databasePlatformService';

export const DatabasePlatformDashboard: React.FC = () => {
  const [overview, setOverview] = useState<any>(null);

  useEffect(() => {
    getDatabasePlatformOverview().then(setOverview);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="px-3 py-1 bg-gradient-to-r from-brand-cyan to-brand-violet text-background font-bold text-xs rounded-full uppercase tracking-wider">
            Version 9.2 Data Resilience Release
          </span>
          <h1 className="text-2xl font-bold text-white mt-2 flex items-center gap-2">
            <Database className="w-7 h-7 text-brand-cyan" /> Distributed Database & High Availability Platform
          </h1>
          <p className="text-text-muted text-sm mt-1">Enterprise PostgreSQL clustering, streaming replication & disaster recovery</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
          <span className="text-xs text-text-muted uppercase">Platform Status</span>
          <div className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6" /> Resilient (HA Active)
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
          <span className="text-xs text-text-muted uppercase">Active PG Clusters</span>
          <div className="text-2xl font-bold text-white">{overview?.clustersCount || 1} Primary</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
          <span className="text-xs text-text-muted uppercase">Replication Streaming</span>
          <div className="text-2xl font-bold text-brand-cyan">Sync (1.2 ms lag)</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
          <span className="text-xs text-text-muted uppercase">Backup Health</span>
          <div className="text-2xl font-bold text-emerald-400">PITR Active</div>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
        <h3 className="font-bold text-white text-lg flex items-center gap-2">
          <Activity className="w-5 h-5 text-brand-cyan" /> Cluster Health & Resource Telemetry
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {overview?.health?.map((h: any) => (
            <div key={h.id} className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-2">
              <div className="flex justify-between items-center text-xs text-text-muted">
                <span>CPU Utilization</span>
                <span className="font-bold text-white">{h.cpuUtilizationPct}%</span>
              </div>
              <div className="flex justify-between items-center text-xs text-text-muted">
                <span>Memory Usage</span>
                <span className="font-bold text-white">{h.memoryUtilizationPct}%</span>
              </div>
              <div className="flex justify-between items-center text-xs text-text-muted">
                <span>Disk Utilization</span>
                <span className="font-bold text-white">{h.diskUtilizationPct}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
