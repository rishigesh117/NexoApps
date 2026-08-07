import React, { useEffect, useState } from 'react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { getSystemAlerts } from '../../services/monitoringService';
import { SystemAlert } from '../../../shared/types';

export const AlertCenter: React.FC = () => {
  const [alerts, setAlerts] = useState<SystemAlert[]>([]);

  useEffect(() => {
    getSystemAlerts().then((res) => setAlerts(res.alerts));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-brand-cyan" /> Production System Alert Center
        </h2>
        <p className="text-text-muted text-sm">Active production alerts, severity thresholds & resolution logs</p>
      </div>

      <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
        {alerts.map((a) => (
          <div key={a.id} className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-white text-sm">{a.alertTitle}</h4>
              <p className="text-text-muted text-xs">{a.message}</p>
            </div>
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-lg flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Resolved
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
