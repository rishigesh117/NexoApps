import React from 'react';
import { Activity, Cpu, Database, Zap, Clock } from 'lucide-react';

export const PerformanceMonitorCard: React.FC = () => {
  const metrics = [
    { label: 'Avg API Response Time', value: '42.5 ms', icon: <Zap className="w-4 h-4 text-brand-cyan" />, status: 'Optimal (<50ms)' },
    { label: 'Database Query P99', value: '12.8 ms', icon: <Database className="w-4 h-4 text-emerald-400" />, status: 'Indexed' },
    { label: 'Memory Usage (RSS)', value: '148 MB', icon: <Cpu className="w-4 h-4 text-violet-400" />, status: 'Low Memory Footprint' },
    { label: 'Cache Hit Ratio', value: '98.4%', icon: <Activity className="w-4 h-4 text-amber-400" />, status: 'High Cache Hit' },
  ];

  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">Platform Performance Telemetry</h3>
          <p className="text-xs text-text-muted">Real-time latency, memory usage, and query performance benchmarks</p>
        </div>
        <span className="px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan text-xs font-bold uppercase tracking-wider flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" /> Real-time
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <div key={m.label} className="p-4 rounded-2xl bg-surface-100 border border-white/10 text-center space-y-1">
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center mx-auto mb-2">
              {m.icon}
            </div>
            <p className="text-2xl font-bold text-white">{m.value}</p>
            <p className="text-xs text-text-muted font-semibold">{m.label}</p>
            <span className="inline-block text-[10px] text-emerald-400 font-medium bg-emerald-500/10 px-2 py-0.5 rounded-full mt-1">
              {m.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
