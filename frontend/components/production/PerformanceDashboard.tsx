import React, { useEffect, useState } from 'react';
import { Activity, BarChart3, TrendingUp } from 'lucide-react';
import { getPerformanceMetrics } from '../../services/performanceService';
import { PerformanceMetric } from '../../../shared/types';

export const PerformanceDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);

  useEffect(() => {
    getPerformanceMetrics().then(setMetrics);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Activity className="w-6 h-6 text-brand-cyan" /> Enterprise Performance Dashboard
        </h2>
        <p className="text-text-muted text-sm">Real-time P95/P99 response latency benchmarks and throughput profiling</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((m) => (
          <div key={m.id} className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
            <span className="text-xs text-text-muted uppercase">{m.metricName}</span>
            <div className="text-3xl font-bold text-white mt-1">{m.metricValue}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
