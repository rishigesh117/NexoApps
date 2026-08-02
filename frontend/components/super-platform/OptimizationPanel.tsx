import React from 'react';
import { Sliders, Zap } from 'lucide-react';

export const OptimizationPanel: React.FC = () => {
  const profiles = [
    { name: 'Ultra-Low Latency Edge Profile', target: '25ms', cpuSaver: 'Disabled' },
    { name: 'High-Throughput Enterprise Profile', target: '100ms', cpuSaver: 'Enabled' },
  ];

  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-6">
      <h3 className="text-lg font-bold text-white">AI Optimization & Tuning Profiles</h3>
      <div className="space-y-3">
        {profiles.map((p) => (
          <div key={p.name} className="p-4 rounded-2xl bg-surface-100 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap className="w-4 h-4 text-emerald-400" />
              <div>
                <h4 className="text-xs font-bold text-white">{p.name}</h4>
                <p className="text-[10px] text-text-muted font-mono mt-0.5">Target Latency: {p.target} • CPU Saver: {p.cpuSaver}</p>
              </div>
            </div>
            <button className="px-3 py-1.5 rounded-xl bg-brand-cyan/20 text-brand-cyan text-xs font-bold hover:bg-brand-cyan/30 transition-colors">
              Activate Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
