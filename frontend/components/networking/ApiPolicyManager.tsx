import React, { useEffect, useState } from 'react';
import { Lock, ShieldCheck } from 'lucide-react';
import { trafficPolicyService } from '../../services/trafficPolicyService';
import { ApiPolicy } from '../../../shared/types';

export const ApiPolicyManager: React.FC = () => {
  const [policies, setPolicies] = useState<ApiPolicy[]>([]);

  useEffect(() => {
    trafficPolicyService.getApiPolicies().then((res) => setPolicies(res));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
          <Lock className="w-5 h-5 text-brand-cyan" /> API Gateway Middleware & Security Policies
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {policies.map((p) => (
          <div key={p.id} className="p-5 rounded-xl glass-panel border border-white/10 bg-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-mono text-brand-cyan bg-brand-cyan/10 px-2 py-0.5 rounded">
                {p.policyType}
              </span>
              <span className="text-xs text-emerald-400 font-bold">Enabled</span>
            </div>
            <h3 className="font-bold text-white text-base font-display">{p.policyName}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};
