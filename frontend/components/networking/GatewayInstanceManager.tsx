import React, { useEffect, useState } from 'react';
import { Server, CheckCircle2, Radio } from 'lucide-react';
import { gatewayService } from '../../services/gatewayService';
import { GatewayInstance } from '../../../shared/types';

export const GatewayInstanceManager: React.FC = () => {
  const [instances, setInstances] = useState<GatewayInstance[]>([]);

  useEffect(() => {
    gatewayService.getInstances().then((res) => setInstances(res));
  }, []);

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-white uppercase tracking-wider">Gateway Instance Nodes</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {instances.map((inst) => (
          <div key={inst.id} className="p-4 rounded-xl glass-panel border border-white/10 bg-white/5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-brand-cyan">{inst.region}</span>
              <span className="text-emerald-400 font-bold uppercase text-[10px]">{inst.status}</span>
            </div>
            <h4 className="font-semibold text-white text-xs">{inst.instanceName}</h4>
            <div className="text-[11px] font-mono text-text-muted">{inst.hostIp}:{inst.port}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
