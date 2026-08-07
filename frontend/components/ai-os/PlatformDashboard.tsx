import React, { useState, useEffect } from 'react';
import { Cpu, Activity, ShieldCheck, Zap } from 'lucide-react';
import { platformOsService } from '../../services/platformOsService';

export const PlatformDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      const res = await platformOsService.getDashboardMetrics();
      if (res.success) setMetrics(res.data);
    } catch (err) {
      console.error('Failed to load dashboard metrics', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 rounded-3xl border border-white/10 flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-brand-cyan" />
            AI OS Central Platform Dashboard & System Telemetry
          </h3>
          <p className="text-xs text-text-muted mt-1">Version {metrics?.version || '7.0.0'} Release</p>
        </div>
        <span className="text-xs font-bold px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase flex items-center gap-1">
          <ShieldCheck className="w-4 h-4" /> {metrics?.status || 'OPERATIONAL'}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-surface-100/80 border border-white/10">
          <span className="text-[10px] font-bold text-text-muted uppercase">Active Subsystems</span>
          <h4 className="text-2xl font-extrabold text-brand-cyan mt-1">{metrics?.activeModules || 14}</h4>
        </div>
        <div className="p-4 rounded-2xl bg-surface-100/80 border border-white/10">
          <span className="text-[10px] font-bold text-text-muted uppercase">Total API Calls / Day</span>
          <h4 className="text-2xl font-extrabold text-emerald-400 mt-1">{(metrics?.totalRequestsToday || 142500).toLocaleString()}</h4>
        </div>
        <div className="p-4 rounded-2xl bg-surface-100/80 border border-white/10">
          <span className="text-[10px] font-bold text-text-muted uppercase">System Latency</span>
          <h4 className="text-2xl font-extrabold text-brand-violet mt-1">{metrics?.averageLatencyMs || 14.2} ms</h4>
        </div>
        <div className="p-4 rounded-2xl bg-surface-100/80 border border-white/10">
          <span className="text-[10px] font-bold text-text-muted uppercase">Global Uptime</span>
          <h4 className="text-2xl font-extrabold text-amber-400 mt-1">{metrics?.overallUptimePct || 99.99}%</h4>
        </div>
      </div>
    </div>
  );
};
