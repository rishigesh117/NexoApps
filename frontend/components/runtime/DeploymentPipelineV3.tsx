import React from 'react';
import { Rocket, CheckCircle2 } from 'lucide-react';

export const DeploymentPipelineV3: React.FC = () => {
  const deployments = [
    { name: 'AI OS API Server Deployment', artifact: 's3://nexo-artifacts/v5.1.0.tar.gz', status: 'deployed', replicas: 3 },
    { name: 'Vector Embeddings Worker Fleet', artifact: 's3://nexo-artifacts/vector-worker:v5.1.tar.gz', status: 'deployed', replicas: 2 },
  ];

  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-6">
      <h3 className="text-lg font-bold text-white">Autonomous Deployment Pipeline v3</h3>
      <div className="space-y-3">
        {deployments.map((d) => (
          <div key={d.name} className="p-4 rounded-2xl bg-surface-100 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Rocket className="w-4 h-4 text-brand-cyan" />
              <div>
                <h4 className="text-xs font-bold text-white">{d.name}</h4>
                <p className="text-[10px] text-text-muted font-mono mt-0.5">{d.artifact} • {d.replicas} Replicas</p>
              </div>
            </div>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
        ))}
      </div>
    </div>
  );
};
