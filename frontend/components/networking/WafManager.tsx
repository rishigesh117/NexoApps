import React, { useEffect, useState } from 'react';
import { Shield, CheckCircle2 } from 'lucide-react';
import { networkSecurityService } from '../../services/networkSecurityService';
import { WafPolicy, WafRule } from '../../../shared/types';

export const WafManager: React.FC = () => {
  const [policies, setPolicies] = useState<WafPolicy[]>([]);
  const [rules, setRules] = useState<WafRule[]>([]);

  useEffect(() => {
    Promise.all([
      networkSecurityService.getWafPolicies(),
      networkSecurityService.getWafRules(),
    ]).then(([p, r]) => {
      setPolicies(p);
      setRules(r);
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
          <Shield className="w-5 h-5 text-rose-400" /> Web Application Firewall (WAF) Control Center
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {policies.map((p) => (
          <div key={p.id} className="p-5 rounded-xl glass-panel border border-white/10 bg-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-mono text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded">
                Mode: {p.mode}
              </span>
              <span className="text-xs text-emerald-400 font-bold">Active</span>
            </div>
            <h3 className="font-bold text-white text-base font-display">{p.policyName}</h3>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-xl glass-panel border border-white/10 bg-white/5 space-y-3">
        <h3 className="text-xs font-semibold uppercase text-text-muted">Enforced WAF Threat Rules</h3>
        <div className="space-y-2">
          {rules.map((r) => (
            <div key={r.id} className="p-3 rounded-lg bg-black/20 border border-white/5 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold uppercase">{r.category}</span>
                <span className="text-white font-bold">{r.ruleName}</span>
              </div>
              <span className="text-emerald-400">{r.action}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
