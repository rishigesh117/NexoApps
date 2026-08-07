import React, { useEffect, useState } from 'react';
import { Sliders, Plus, CheckCircle2 } from 'lucide-react';
import { getAutoscalingPolicies } from '../../services/productionService';
import { AutoscalingPolicy } from '../../../shared/types';

export const AutoscalingManager: React.FC = () => {
  const [policies, setPolicies] = useState<AutoscalingPolicy[]>([]);

  useEffect(() => {
    getAutoscalingPolicies().then(setPolicies);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Sliders className="w-6 h-6 text-brand-cyan" /> Autoscaling & Replica Manager
        </h2>
        <p className="text-text-muted text-sm">Horizontal Pod Autoscaler (HPA) policies and CPU target thresholds</p>
      </div>

      <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
        {policies.map((p) => (
          <div key={p.id} className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-white text-sm">{p.policyName}</h4>
              <p className="text-text-muted text-xs">Replicas: {p.minReplicas} min / {p.maxReplicas} max • Target CPU: {p.cpuThresholdPct}%</p>
            </div>
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-lg flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Enforced
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
