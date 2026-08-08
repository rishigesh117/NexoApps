import React, { useEffect, useState } from 'react';
import { Zap, Shield } from 'lucide-react';
import { trafficPolicyService } from '../../services/trafficPolicyService';
import { RateLimitPolicy } from '../../../shared/types';

export const RateLimitManager: React.FC = () => {
  const [policies, setPolicies] = useState<RateLimitPolicy[]>([]);

  useEffect(() => {
    trafficPolicyService.getRateLimitPolicies().then((res) => setPolicies(res));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
          <Zap className="w-5 h-5 text-brand-cyan" /> Rate Limiting & Throttling Policies
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {policies.map((p) => (
          <div key={p.id} className="p-5 rounded-xl glass-panel border border-white/10 bg-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">
                Scope: {p.scope}
              </span>
              <span className="text-xs text-amber-400 font-bold">{p.requestsPerSecond} req/sec</span>
            </div>
            <h3 className="font-bold text-white text-base font-display">{p.policyName}</h3>
            <div className="text-xs text-text-muted">Burst limit: <strong className="text-white">{p.burstLimit}</strong></div>
          </div>
        ))}
      </div>
    </div>
  );
};
