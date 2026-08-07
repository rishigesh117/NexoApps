import React, { useState, useEffect } from 'react';
import { GitBranch, CheckCircle2 } from 'lucide-react';
import { platformService } from '../../services/platformService';
import { PlatformIntegration } from '../../../shared/types';

export const IntegrationCenter: React.FC = () => {
  const [integrations, setIntegrations] = useState<PlatformIntegration[]>([]);

  useEffect(() => {
    platformService.getIntegrations().then(setIntegrations);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Enterprise Integration Center</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrations.map(i => (
          <div key={i.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-white text-lg flex items-center gap-2">
                <GitBranch className="w-5 h-5 text-purple-400" /> {i.integrationName}
              </h3>
              <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded text-xs font-semibold uppercase">{i.status}</span>
            </div>
            <p className="text-xs text-slate-400 font-mono">Type: {i.integrationType}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
