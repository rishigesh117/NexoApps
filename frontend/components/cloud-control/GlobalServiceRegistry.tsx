import React, { useEffect, useState } from 'react';
import { Server, CheckCircle2 } from 'lucide-react';
import { globalTrafficService } from '../../services/globalTrafficService';
import { GlobalServiceRegistry as ServiceType } from '../../../shared/types';

export const GlobalServiceRegistry: React.FC = () => {
  const [services, setServices] = useState<ServiceType[]>([]);

  useEffect(() => {
    globalTrafficService.getServices().then((res) => setServices(res));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
          <Server className="w-5 h-5 text-brand-cyan" /> Global Microservice Registry
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((s) => (
          <div key={s.id} className="p-5 rounded-xl glass-panel border border-white/10 bg-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">
                {s.serviceType}
              </span>
              <span className="text-xs text-emerald-400 font-bold">v{s.version}</span>
            </div>
            <h3 className="font-bold text-white text-base font-display">{s.serviceName}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};
