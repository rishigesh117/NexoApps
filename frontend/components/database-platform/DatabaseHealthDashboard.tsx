import React, { useEffect, useState } from 'react';
import { HeartPulse, CheckCircle2 } from 'lucide-react';
import { getDatabaseHealthData } from '../../services/databaseMonitoringService';
import { DatabaseHealth } from '../../../shared/types';

export const DatabaseHealthDashboard: React.FC = () => {
  const [healthList, setHealthList] = useState<DatabaseHealth[]>([]);

  useEffect(() => {
    getDatabaseHealthData().then((res) => setHealthList(res.health));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <HeartPulse className="w-6 h-6 text-brand-cyan" /> Database Health Dashboard
        </h2>
        <p className="text-text-muted text-sm">Cluster score, IOPS benchmarks, buffer cache hit ratio & connections</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {healthList.map((h) => (
          <div key={h.id} className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-base">Cluster: {h.clusterId}</h3>
              <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> {h.healthScore}/100
              </span>
            </div>
            <div className="space-y-1 text-xs text-text-muted">
              <div className="flex justify-between"><span>CPU</span><span className="font-bold text-white">{h.cpuUtilizationPct}%</span></div>
              <div className="flex justify-between"><span>Memory</span><span className="font-bold text-white">{h.memoryUtilizationPct}%</span></div>
              <div className="flex justify-between"><span>Disk</span><span className="font-bold text-white">{h.diskUtilizationPct}%</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
