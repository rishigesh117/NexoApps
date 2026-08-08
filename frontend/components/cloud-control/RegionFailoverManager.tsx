import React, { useEffect, useState } from 'react';
import { Shield, ArrowRight } from 'lucide-react';
import { globalTrafficService } from '../../services/globalTrafficService';
import { RegionFailoverPolicy } from '../../../shared/types';

export const RegionFailoverManager: React.FC = () => {
  const [policies, setPolicies] = useState<RegionFailoverPolicy[]>([]);

  useEffect(() => {
    globalTrafficService.getFailoverPolicies().then((res) => setPolicies(res));
  }, []);

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-white uppercase tracking-wider">Region Failover Policies</h3>
      <div className="space-y-3">
        {policies.map((p) => (
          <div key={p.id} className="p-4 rounded-xl glass-panel border border-white/10 bg-white/5 flex items-center justify-between text-xs">
            <div>
              <span className="font-mono text-purple-400 font-bold">{p.policyName}</span>
              <div className="text-text-muted text-[11px]">Threshold: {p.healthThresholdPct}%</div>
            </div>
            <span className="text-emerald-400 font-bold uppercase text-[10px]">{p.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
