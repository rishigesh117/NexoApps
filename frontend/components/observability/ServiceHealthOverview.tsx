import React, { useEffect, useState } from 'react';
import { Server, CheckCircle2, AlertTriangle, XCircle, RefreshCw } from 'lucide-react';
import { observabilityService } from '../../services/observabilityService';
import { ObservabilityService } from '../../../shared/types';

export const ServiceHealthOverview: React.FC = () => {
  const [services, setServices] = useState<ObservabilityService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    observabilityService.getServices().then((res) => {
      setServices(res);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-text-muted">Loading Services Health...</div>;
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case 'degraded':
        return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      default:
        return <XCircle className="w-4 h-4 text-rose-400" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
          <Server className="w-5 h-5 text-brand-cyan" /> Monitored Services & Instance Health
        </h2>
        <span className="text-xs text-text-muted">{services.length} services registered</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((svc) => (
          <div key={svc.id} className="p-5 rounded-xl glass-panel border border-white/10 bg-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-text-muted uppercase">{svc.serviceType}</span>
              <div className="flex items-center gap-1 text-xs capitalize font-medium">
                {getStatusIcon(svc.healthStatus)}
                <span className={svc.healthStatus === 'healthy' ? 'text-emerald-400' : 'text-amber-400'}>
                  {svc.healthStatus}
                </span>
              </div>
            </div>
            <h3 className="text-base font-bold text-white font-display">{svc.serviceName}</h3>
            <div className="flex items-center justify-between text-xs text-text-muted pt-2 border-t border-white/10">
              <span>Lang: {svc.language}</span>
              <span>v{svc.version}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
