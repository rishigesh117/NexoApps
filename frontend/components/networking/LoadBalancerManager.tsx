import React, { useEffect, useState } from 'react';
import { Activity, Server, CheckCircle2 } from 'lucide-react';
import { loadBalancerService } from '../../services/loadBalancerService';
import { LoadBalancer } from '../../../shared/types';

export const LoadBalancerManager: React.FC = () => {
  const [loadBalancers, setLoadBalancers] = useState<LoadBalancer[]>([]);

  useEffect(() => {
    loadBalancerService.getLoadBalancers().then((res) => setLoadBalancers(res));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-brand-cyan" /> Layer 4 / Layer 7 Load Balancer Array
        </h2>
        <span className="text-xs text-text-muted">{loadBalancers.length} load balancers</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loadBalancers.map((lb) => (
          <div key={lb.id} className="p-5 rounded-xl glass-panel border border-white/10 bg-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">
                {lb.type}
              </span>
              <span className="text-xs text-emerald-400 font-bold uppercase flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> {lb.status}
              </span>
            </div>
            <h3 className="font-bold text-white text-base font-display">{lb.name}</h3>
            <div className="flex items-center justify-between text-xs text-text-muted pt-2 border-t border-white/10">
              <span>Virtual IP: <strong className="text-white font-mono">{lb.virtualIp}</strong></span>
              <span>Algo: <strong className="text-white capitalize">{lb.algorithm}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
