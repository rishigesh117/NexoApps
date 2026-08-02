import React from 'react';
import { Sliders, Cpu } from 'lucide-react';

export const AutoscalingConfigurator: React.FC = () => {
  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">Horizontal Pod Autoscaling (HPA) Configurator</h3>
          <p className="text-xs text-text-muted">Target CPU thresholds, minimum replicas, and maximum scale bounds</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-surface-100 border border-white/10 text-center space-y-1">
          <p className="text-2xl font-bold text-white">1</p>
          <p className="text-xs text-text-muted font-semibold">Min Replicas</p>
        </div>
        <div className="p-4 rounded-2xl bg-surface-100 border border-white/10 text-center space-y-1">
          <p className="text-2xl font-bold text-emerald-400">10</p>
          <p className="text-xs text-text-muted font-semibold">Max Replicas</p>
        </div>
        <div className="p-4 rounded-2xl bg-surface-100 border border-white/10 text-center space-y-1">
          <p className="text-2xl font-bold text-brand-cyan">70%</p>
          <p className="text-xs text-text-muted font-semibold">Target CPU Threshold</p>
        </div>
      </div>
    </div>
  );
};
