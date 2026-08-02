import React from 'react';
import { Activity, TrendingUp } from 'lucide-react';

export const EnterpriseMetricsPanel: React.FC = () => {
  const metrics = [
    { label: 'Workforce Capacity Utilization', value: '94.2%', status: 'High Efficiency' },
    { label: 'Decision Accuracy Score', value: '98.8%', status: 'Validated' },
  ];

  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-6">
      <h3 className="text-lg font-bold text-white">Enterprise Productivity & ROI Metrics</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metrics.map((m) => (
          <div key={m.label} className="p-4 rounded-2xl bg-surface-100 border border-white/10 text-center space-y-1">
            <p className="text-3xl font-bold text-white">{m.value}</p>
            <p className="text-xs text-text-muted font-semibold">{m.label}</p>
            <span className="inline-block text-[10px] text-emerald-400 font-medium bg-emerald-500/10 px-2.5 py-0.5 rounded-full mt-1">
              {m.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
