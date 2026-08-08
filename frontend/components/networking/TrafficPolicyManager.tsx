import React, { useEffect, useState } from 'react';
import { Sliders, Zap } from 'lucide-react';
import { trafficPolicyService } from '../../services/trafficPolicyService';
import { TrafficPolicy } from '../../../shared/types';

export const TrafficPolicyManager: React.FC = () => {
  const [policies, setPolicies] = useState<TrafficPolicy[]>([]);

  useEffect(() => {
    trafficPolicyService.getTrafficPolicies().then((res) => setPolicies(res));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
          <Sliders className="w-5 h-5 text-brand-cyan" /> Traffic Management & Canary Routing Policies
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {policies.map((p) => (
          <div key={p.id} className="p-5 rounded-xl glass-panel border border-white/10 bg-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-mono text-brand-cyan bg-brand-cyan/10 px-2 py-0.5 rounded">
                {p.policyType}
              </span>
              <span className="text-xs text-brand-cyan font-bold">{p.trafficSplitPct}% Split</span>
            </div>
            <h3 className="font-bold text-white text-base font-display">{p.policyName}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};
