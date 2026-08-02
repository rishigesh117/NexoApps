import React from 'react';
import { Rocket, CheckCircle2, Play } from 'lucide-react';

export const DeploymentPipeline: React.FC = () => {
  const jobs = [
    { id: '1', name: 'Deploy v3.3.0 Release', artifact: 'nexoapps/api:v3.3.0', target: 'Production Kubernetes Cluster', status: 'completed', duration: '3m 00s' },
    { id: '2', name: 'Hotfix v3.2.1 Deployment', artifact: 'nexoapps/api:v3.2.1', target: 'Staging EKS Cluster', status: 'completed', duration: '2m 58s' },
  ];

  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">Cloud Deployment Pipelines</h3>
          <p className="text-xs text-text-muted">Kubernetes rolling updates, canary releases, and deployment logs</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold shadow-glow-cyan hover:opacity-95 transition-all">
          <Rocket className="w-3.5 h-3.5" /> Deploy Build
        </button>
      </div>

      <div className="space-y-3">
        {jobs.map((j) => (
          <div key={j.id} className="p-4 rounded-2xl bg-surface-100 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <div>
                <h4 className="text-xs font-bold text-white">{j.name}</h4>
                <p className="text-[10px] text-text-muted font-mono mt-0.5">{j.artifact} → {j.target}</p>
              </div>
            </div>
            <span className="text-xs font-mono text-text-muted">{j.duration}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
