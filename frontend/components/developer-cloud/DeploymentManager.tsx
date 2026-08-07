import React, { useState, useEffect } from 'react';
import { Rocket, CheckCircle2 } from 'lucide-react';
import { deploymentService } from '../../services/deploymentService';
import { DeploymentHistory } from '../../../shared/types';

export const DeploymentManager: React.FC = () => {
  const [deployments, setDeployments] = useState<DeploymentHistory[]>([]);

  useEffect(() => {
    deploymentService.getDeployments().then(setDeployments);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Multi-Target Deployment Center</h2>
      <div className="space-y-4 max-w-4xl">
        {deployments.map(d => (
          <div key={d.id} className="bg-slate-800 p-5 rounded-xl border border-slate-700 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Rocket className="w-5 h-5 text-indigo-400" />
              <div>
                <h3 className="font-semibold text-white font-mono">{d.imageTag}</h3>
                <p className="text-xs text-slate-400 font-mono">Target: {d.targetId}</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded text-xs font-semibold uppercase">{d.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
