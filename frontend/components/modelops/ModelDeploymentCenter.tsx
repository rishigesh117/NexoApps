import React, { useState, useEffect } from 'react';
import { Zap, CheckCircle2 } from 'lucide-react';
import { deploymentEndpointService } from '../../services/deploymentEndpointService';
import { ModelDeployment } from '../../../shared/types';

export const ModelDeploymentCenter: React.FC = () => {
  const [deployments, setDeployments] = useState<ModelDeployment[]>([]);

  useEffect(() => {
    deploymentEndpointService.getDeployments().then(setDeployments);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Real-Time Inference Endpoint Deployment Center (vLLM / Triton)</h2>
      <div className="space-y-4 max-w-4xl">
        {deployments.map(d => (
          <div key={d.id} className="bg-slate-800 p-5 rounded-xl border border-slate-700 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-cyan-400" />
              <div>
                <h3 className="font-semibold text-white">{d.deploymentName}</h3>
                <p className="text-xs text-slate-400 font-mono">Replicas: {d.replicaCount} | Version: {d.modelVersionId}</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded text-xs font-semibold uppercase">{d.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
