import React from 'react';
import { Cpu, Zap, Activity, Clock } from 'lucide-react';

export const AgentMetricsDashboard: React.FC = () => {
  const metrics = [
    { label: 'Tokens Consumed Today', value: '284,500', unit: 'tokens', status: 'Optimal' },
    { label: 'Avg Execution Latency', value: '1.18s', unit: 'seconds', status: 'Sub-2s' },
    { label: 'Task Success Rate', value: '99.4%', unit: 'percentage', status: 'Passed' },
    { label: 'Swarm Efficiency Score', value: '98.6%', unit: 'score', status: 'A+ Grade' },
  ];

  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-6">
      <h3 className="text-lg font-bold text-white">Agent Telemetry & Efficiency Metrics</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <div key={m.label} className="p-4 rounded-2xl bg-surface-100 border border-white/10 text-center space-y-1">
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
