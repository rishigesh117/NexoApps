import React, { useState } from 'react';
import { Server, Activity, Shield } from 'lucide-react';

export const EnterpriseServiceManager: React.FC = () => {
  const [services] = useState([
    { id: 's1', name: 'AI Core Router Engine', type: 'core_ai', status: 'healthy', version: '9.0.0' },
    { id: 's2', name: 'Enterprise Workflow Engine', type: 'automation', status: 'healthy', version: '9.0.0' },
    { id: 's3', name: 'Identity & Access RBAC Service', type: 'security', status: 'healthy', version: '9.0.0' }
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Server className="w-6 h-6 text-brand-cyan" /> Enterprise Service Manager
        </h2>
        <p className="text-text-muted text-sm">Microservice management & runtime health monitoring</p>
      </div>

      <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
        {services.map((s) => (
          <div key={s.id} className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-brand-cyan/20 text-brand-cyan rounded-lg">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm">{s.name}</h4>
                <p className="text-text-muted text-xs">Type: {s.type} • Version: {s.version}</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-lg flex items-center gap-1">
              <Activity className="w-3.5 h-3.5" /> Healthy
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
