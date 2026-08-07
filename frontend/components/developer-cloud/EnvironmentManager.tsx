import React, { useState, useEffect } from 'react';
import { Server, CheckCircle2 } from 'lucide-react';
import { deploymentService } from '../../services/deploymentService';
import { DeploymentEnvironment } from '../../../shared/types';

export const EnvironmentManager: React.FC = () => {
  const [envs, setEnvs] = useState<DeploymentEnvironment[]>([]);

  useEffect(() => {
    deploymentService.getEnvironments().then(setEnvs);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Deployment Environments (Dev / Staging / Prod)</h2>
      <div className="space-y-4 max-w-4xl">
        {envs.map(e => (
          <div key={e.id} className="bg-slate-800 p-5 rounded-xl border border-slate-700 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Server className="w-5 h-5 text-cyan-400" />
              <div>
                <h3 className="font-semibold text-white">{e.envName}</h3>
                <p className="text-xs text-slate-400 font-mono">Type: {e.envType}</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded text-xs font-semibold uppercase flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5"/> Active</span>
          </div>
        ))}
      </div>
    </div>
  );
};
