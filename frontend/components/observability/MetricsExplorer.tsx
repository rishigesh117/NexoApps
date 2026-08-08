import React, { useEffect, useState } from 'react';
import { Activity, Search, Filter, Cpu, Database, RefreshCw } from 'lucide-react';
import { metricsService } from '../../services/metricsService';
import { MetricDefinition } from '../../../shared/types';

export const MetricsExplorer: React.FC = () => {
  const [metrics, setMetrics] = useState<MetricDefinition[]>([]);
  const [selectedMetric, setSelectedMetric] = useState<string>('system.cpu.utilization');
  const [queryResult, setQueryResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    metricsService.getMetricDefinitions().then((defs) => {
      setMetrics(defs);
      if (defs.length) setSelectedMetric(defs[0].metricName);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (selectedMetric) {
      metricsService.queryMetrics({ metricName: selectedMetric }).then((res) => {
        setQueryResult(res);
      });
    }
  }, [selectedMetric]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-brand-cyan" /> Metrics Explorer & Time-Series Analytics
        </h2>
        <span className="text-xs text-text-muted">{metrics.length} metric definitions available</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Metric Picker Sidebar */}
        <div className="p-4 rounded-xl glass-panel border border-white/10 bg-white/5 space-y-2">
          <h3 className="text-xs uppercase font-semibold text-text-muted mb-2">Metrics Registry</h3>
          {metrics.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedMetric(m.metricName)}
              className={`w-full p-2.5 rounded-lg text-left text-xs transition-all ${
                selectedMetric === m.metricName
                  ? 'bg-brand-cyan/20 text-brand-cyan font-bold border border-brand-cyan/30'
                  : 'text-text-muted hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="font-mono">{m.metricName}</div>
              <div className="text-[10px] text-text-muted font-sans capitalize">{m.metricType} ({m.unit})</div>
            </button>
          ))}
        </div>

        {/* Metric Chart & Summary View */}
        <div className="lg:col-span-3 p-6 rounded-xl glass-panel border border-white/10 bg-white/5 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white font-display">{selectedMetric}</h3>
              <p className="text-xs text-text-muted">Unit: {queryResult?.unit || '%'} | Time Window: 1 hour</p>
            </div>
            <button className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5 text-brand-cyan" /> Refresh Query
            </button>
          </div>

          {/* Metric Summary Cards */}
          <div className="grid grid-cols-4 gap-4">
            <div className="p-3 rounded-lg bg-black/20 text-center">
              <span className="text-[10px] text-text-muted uppercase font-semibold">Average</span>
              <div className="text-lg font-bold text-white font-mono">{queryResult?.summary?.avg?.toFixed(1) || '0.0'}</div>
            </div>
            <div className="p-3 rounded-lg bg-black/20 text-center">
              <span className="text-[10px] text-text-muted uppercase font-semibold">Min</span>
              <div className="text-lg font-bold text-white font-mono">{queryResult?.summary?.min?.toFixed(1) || '0.0'}</div>
            </div>
            <div className="p-3 rounded-lg bg-black/20 text-center">
              <span className="text-[10px] text-text-muted uppercase font-semibold">Max</span>
              <div className="text-lg font-bold text-white font-mono">{queryResult?.summary?.max?.toFixed(1) || '0.0'}</div>
            </div>
            <div className="p-3 rounded-lg bg-black/20 text-center">
              <span className="text-[10px] text-text-muted uppercase font-semibold">Samples</span>
              <div className="text-lg font-bold text-brand-cyan font-mono">{queryResult?.summary?.count || 0}</div>
            </div>
          </div>

          {/* Visual Graph Visualization Placeholder */}
          <div className="h-48 rounded-xl bg-black/30 border border-white/5 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-brand-cyan/10 to-transparent"></div>
            <div className="text-xs text-text-muted flex items-center gap-2">
              <Activity className="w-4 h-4 text-brand-cyan" />
              <span>Real-Time Metric Stream: {selectedMetric} (Live Time Series)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
