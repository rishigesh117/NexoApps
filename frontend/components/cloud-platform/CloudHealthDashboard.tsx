import React, { useState, useEffect } from 'react';
import { Activity, ShieldCheck, Server } from 'lucide-react';
import { cloudPlatformService } from '../../services/cloudPlatformService';

export const CloudHealthDashboard: React.FC = () => {
  const [health, setHealth] = useState<any>(null);

  useEffect(() => {
    cloudPlatformService.getHealth().then(setHealth);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Cloud Service Health & Diagnostics</h2>
      <div className="space-y-4 max-w-3xl">
        {health?.services?.map((svc: any, idx: number) => (
          <div key={idx} className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Server className="w-5 h-5 text-cyan-400" />
              <span className="font-semibold text-white">{svc.serviceName}</span>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="text-slate-400">{svc.latencyMs} ms</span>
              <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded uppercase font-bold">{svc.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
