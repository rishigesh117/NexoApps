import React from 'react';
import { Cpu, Activity, Zap } from 'lucide-react';

export const RuntimeMonitorGrid: React.FC = () => {
  const metrics = [
    { label: 'CPU Usage', value: '24.5%', status: 'Normal' },
    { label: 'Memory (RAM)', value: '128.4 MB', status: 'Optimal' },
    { label: 'Network In', value: '1.05 MB/s', status: 'Active' },
    { label: 'Network Out', value: '2.10 MB/s', status: 'Active' },
  ];

  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-6">
      <h3 className="text-lg font-bold text-white">Runtime Resource Monitor Grid</h3>
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
