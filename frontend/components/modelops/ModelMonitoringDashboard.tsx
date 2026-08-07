import React, { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';
import { modelMonitoringService } from '../../services/modelMonitoringService';
import { ModelMonitoring } from '../../../shared/types';

export const ModelMonitoringDashboard: React.FC = () => {
  const [monitoring, setMonitoring] = useState<ModelMonitoring[]>([]);

  useEffect(() => {
    modelMonitoringService.getMonitoring().then(setMonitoring);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Model Latency & Throughput SLA Health Monitor</h2>
      <div className="space-y-4 max-w-4xl">
        {monitoring.map(m => (
          <div key={m.id} className="bg-slate-800 p-5 rounded-xl border border-slate-700 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Activity className="w-5 h-5 text-emerald-400" />
              <div>
                <h3 className="font-semibold text-white font-mono">{m.deploymentId}</h3>
                <p className="text-xs text-slate-400 font-mono">RPS: {m.requestsPerSec} | p99: {m.p99LatencyMs}ms</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded text-xs font-semibold uppercase font-mono">Error: {m.errorRatePct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};
