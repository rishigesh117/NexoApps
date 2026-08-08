import React, { useEffect, useState } from 'react';
import { Activity, CheckCircle2, AlertTriangle, Globe, Clock } from 'lucide-react';
import { uptimeService } from '../../services/uptimeService';
import { UptimeCheck } from '../../../shared/types';

export const UptimeMonitor: React.FC = () => {
  const [checks, setChecks] = useState<UptimeCheck[]>([]);
  const [stats, setStats] = useState<any>({});

  useEffect(() => {
    uptimeService.getChecks().then((res) => {
      setChecks(res.checks);
      setStats(res.stats);
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
          <Globe className="w-5 h-5 text-brand-cyan" /> Service Availability & Uptime Monitor
        </h2>
        <span className="text-xs text-emerald-400 font-mono font-bold">{stats.overallAvailabilityPct}% Overall SLA</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {checks.map((chk) => (
          <div key={chk.id} className="p-5 rounded-xl glass-panel border border-white/10 bg-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className={`text-xs px-2 py-0.5 rounded font-bold uppercase ${
                chk.status === 'passing' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
              }`}>
                {chk.status}
              </span>
              <span className="text-xs font-mono text-brand-cyan">{chk.latencyMs}ms</span>
            </div>
            <h3 className="font-bold text-white text-base font-display">{chk.checkName}</h3>
            <p className="text-xs text-text-muted font-mono truncate">{chk.targetUrl}</p>
            <div className="flex items-center justify-between text-xs text-text-muted pt-2 border-t border-white/10">
              <span>Interval: {chk.checkIntervalSeconds}s</span>
              <span>Expected Status: {chk.expectedStatusCode}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
