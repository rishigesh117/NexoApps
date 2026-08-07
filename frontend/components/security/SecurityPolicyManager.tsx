import React, { useState, useEffect } from 'react';
import { Shield, CheckCircle } from 'lucide-react';
import { securityService } from '../../services/securityService';
import { SecurityPolicy } from '../../../shared/types';

export const SecurityPolicyManager: React.FC = () => {
  const [policies, setPolicies] = useState<SecurityPolicy[]>([]);

  useEffect(() => {
    securityService.getPolicies().then(setPolicies);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Centralized Security Policy Enforcement Engine</h2>
      <div className="space-y-4 max-w-3xl">
        {policies.map(p => (
          <div key={p.id} className="bg-slate-800 p-5 rounded-xl border border-slate-700 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-emerald-400" />
              <div>
                <h3 className="font-semibold text-white">{p.policyName}</h3>
                <p className="text-xs text-slate-400 font-mono">Category: {p.category}</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded text-xs font-semibold uppercase">{p.enforcementLevel}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
