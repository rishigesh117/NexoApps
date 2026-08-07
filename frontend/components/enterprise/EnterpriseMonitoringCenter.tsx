import React, { useEffect, useState } from 'react';
import { Activity, BarChart3, Clock, Cpu } from 'lucide-react';
import { getEnterpriseHealth } from '../../services/enterpriseMonitoringService';
import { EnterpriseMetric as MetricType } from '../../../shared/types';

export const EnterpriseMonitoringCenter: React.FC = () => {
  const [metrics, setMetrics] = useState<MetricType[]>([]);

  useEffect(() => {
    getEnterpriseHealth().then((res) => setMetrics(res.metrics));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Activity className="w-6 h-6 text-brand-cyan" /> Enterprise Monitoring Center
        </h2>
        <p className="text-text-muted text-sm">System performance metrics, latency benchmarks, and operational telemetry</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metrics.map((m) => (
          <div key={m.id} className="glass-panel p-5 rounded-2xl border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-xs text-text-muted uppercase tracking-wider">{m.metricName}</span>
              <div className="text-3xl font-bold text-white mt-1">{m.metricValue}</div>
            </div>
            <div className="p-3 bg-brand-cyan/20 text-brand-cyan rounded-xl">
              <BarChart3 className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
