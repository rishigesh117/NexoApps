import React, { useEffect, useState } from 'react';
import { Network, CheckCircle2 } from 'lucide-react';
import { getServiceDiscovery } from '../../services/productionService';
import { ServiceDiscovery } from '../../../shared/types';

export const ServiceDiscoveryCenter: React.FC = () => {
  const [services, setServices] = useState<ServiceDiscovery[]>([]);

  useEffect(() => {
    getServiceDiscovery().then(setServices);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Network className="w-6 h-6 text-brand-cyan" /> Distributed Service Discovery Center
        </h2>
        <p className="text-text-muted text-sm">Internal service registry and IP endpoints discovery</p>
      </div>

      <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
        {services.map((s) => (
          <div key={s.id} className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-white text-sm font-mono">{s.serviceName}</h4>
              <p className="text-text-muted text-xs">Endpoint: {s.instanceIp}:{s.port}</p>
            </div>
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-lg flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Discovered
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
