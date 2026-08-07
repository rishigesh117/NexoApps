import React from 'react';
import { BarChart3, ShieldCheck } from 'lucide-react';

export const InfrastructureAnalytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-brand-cyan" /> Production Infrastructure Analytics
        </h2>
        <p className="text-text-muted text-sm">Aggregated telemetry, bandwidth utilization & infrastructure cost efficiency</p>
      </div>

      <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
        <h3 className="font-bold text-white text-base flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" /> Operational Efficiency Matrix
        </h3>
        <div className="space-y-2 text-sm text-text-secondary">
          <div className="flex justify-between"><span>Cache Hit Ratio</span><span className="font-bold text-white">98.4%</span></div>
          <div className="flex justify-between"><span>Async Queue Throughput</span><span className="font-bold text-white">12,500 msg/sec</span></div>
          <div className="flex justify-between"><span>CDN Cache Offload</span><span className="font-bold text-emerald-400">94.2%</span></div>
        </div>
      </div>
    </div>
  );
};
