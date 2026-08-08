import React, { useEffect, useState } from 'react';
import { ShieldCheck, Lock } from 'lucide-react';
import { networkSecurityService } from '../../services/networkSecurityService';
import { FirewallPolicy, NetworkPolicy } from '../../../shared/types';

export const FirewallManager: React.FC = () => {
  const [firewallPolicies, setFirewallPolicies] = useState<FirewallPolicy[]>([]);
  const [networkPolicies, setNetworkPolicies] = useState<NetworkPolicy[]>([]);

  useEffect(() => {
    Promise.all([
      networkSecurityService.getFirewallPolicies(),
      networkSecurityService.getNetworkPolicies(),
    ]).then(([f, n]) => {
      setFirewallPolicies(f);
      setNetworkPolicies(n);
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-brand-cyan" /> Network Layer Firewall & Ingress Rules
        </h2>
      </div>

      <div className="p-4 rounded-xl glass-panel border border-white/10 bg-white/5 space-y-3">
        <h3 className="text-xs font-semibold uppercase text-text-muted">Firewall Rules</h3>
        <div className="space-y-2">
          {firewallPolicies.map((fw) => (
            <div key={fw.id} className="p-3.5 rounded-lg bg-black/20 border border-white/5 flex items-center justify-between text-xs font-mono">
              <div>
                <span className="text-white font-bold">{fw.policyName}</span>
                <div className="text-[10px] text-text-muted">Source: {fw.sourceCidr} &rarr; Port: {fw.destinationPort} ({fw.protocol})</div>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold uppercase">{fw.action}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
