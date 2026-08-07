import React, { useEffect, useState } from 'react';
import { HeartPulse, CheckCircle2 } from 'lucide-react';
import { getHealthChecks } from '../../services/monitoringService';
import { HealthCheck } from '../../../shared/types';

export const HealthCenter: React.FC = () => {
  const [checks, setChecks] = useState<HealthCheck[]>([]);

  useEffect(() => {
    getHealthChecks().then(setChecks);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <HeartPulse className="w-6 h-6 text-brand-cyan" /> Endpoint System Health Center
        </h2>
        <p className="text-text-muted text-sm">Synthetic endpoint health probes and HTTP response status telemetry</p>
      </div>

      <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
        {checks.map((h) => (
          <div key={h.id} className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-white text-sm font-mono">{h.endpointName}</h4>
              <p className="text-text-muted text-xs">Response Latency: {h.responseTimeMs} ms</p>
            </div>
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-lg flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> {h.statusCode} OK
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
