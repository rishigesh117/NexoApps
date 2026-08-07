import React, { useEffect, useState } from 'react';
import { Activity, ShieldCheck, HeartPulse } from 'lucide-react';
import { getEnterpriseHealth } from '../../services/enterpriseMonitoringService';
import { EnterpriseHealth as HealthType } from '../../../shared/types';

export const EnterpriseHealthDashboard: React.FC = () => {
  const [healthList, setHealthList] = useState<HealthType[]>([]);

  useEffect(() => {
    getEnterpriseHealth().then((res) => setHealthList(res.health));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <HeartPulse className="w-6 h-6 text-brand-cyan" /> Enterprise Health Dashboard
        </h2>
        <p className="text-text-muted text-sm">Real-time health telemetry across all 11 platform subsystems</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {healthList.map((h) => (
          <div key={h.id} className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-base">{h.subsystemName}</h3>
              <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Healthy
              </span>
            </div>
            <div className="flex justify-between items-center text-xs text-text-muted">
              <span>Score</span>
              <span className="font-mono text-brand-cyan font-bold">{h.healthScore}%</span>
            </div>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div className="bg-brand-cyan h-full w-full"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
