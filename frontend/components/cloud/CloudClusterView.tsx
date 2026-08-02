import React from 'react';
import { Server, Cpu } from 'lucide-react';

export const CloudClusterView: React.FC = () => {
  const clusters = [
    { name: 'nexo-prod-us-east-1', provider: 'AWS EKS', region: 'us-east-1', status: 'active', nodes: 3 },
    { name: 'nexo-staging-eu-west-1', provider: 'GCP GKE', region: 'europe-west1', status: 'active', nodes: 2 },
  ];

  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-6">
      <h3 className="text-lg font-bold text-white">Kubernetes & Cloud Clusters</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {clusters.map((c) => (
          <div key={c.name} className="p-4 rounded-2xl bg-surface-100 border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-mono text-xs font-bold text-white">{c.name}</h4>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">Healthy</span>
            </div>
            <p className="text-xs text-text-muted">{c.provider} • {c.region} • {c.nodes} Nodes</p>
          </div>
        ))}
      </div>
    </div>
  );
};
