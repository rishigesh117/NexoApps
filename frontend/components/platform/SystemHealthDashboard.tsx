import React, { useState, useEffect } from 'react';
import { Activity, Server } from 'lucide-react';
import { healthService } from '../../services/healthService';
import { SystemHealth } from '../../../shared/types';

export const SystemHealthDashboard: React.FC = () => {
  const [health, setHealth] = useState<SystemHealth[]>([]);

  useEffect(() => {
    healthService.getHealth().then(setHealth);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Real-Time Subsystem Health Monitor</h2>
      <div className="space-y-4 max-w-3xl">
        {health.map(h => (
          <div key={h.id} className="bg-slate-800 p-5 rounded-xl border border-slate-700 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Server className="w-5 h-5 text-cyan-400" />
              <span className="font-semibold text-white">{h.subsystem}</span>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="text-slate-400">CPU: {h.cpuPercent}% | RAM: {h.memoryPercent}%</span>
              <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded uppercase font-bold">{h.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
