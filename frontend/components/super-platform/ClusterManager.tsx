import React from 'react';
import { Server, CheckCircle2 } from 'lucide-react';

export const ClusterManager: React.FC = () => {
  const clusters = [
    { name: 'US-East Production AI Swarm Cluster', region: 'us-east-1', nodes: 16, status: 'healthy' },
    { name: 'EU-West Inference Cluster', region: 'eu-west-1', nodes: 12, status: 'healthy' },
  ];

  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-6">
      <h3 className="text-lg font-bold text-white">Global AI Cluster Management</h3>
      <div className="space-y-3">
        {clusters.map((cl) => (
          <div key={cl.name} className="p-4 rounded-2xl bg-surface-100 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Server className="w-4 h-4 text-brand-cyan" />
              <div>
                <h4 className="text-xs font-bold text-white">{cl.name}</h4>
                <p className="text-[10px] text-text-muted font-mono mt-0.5">Region: {cl.region} • {cl.nodes} Active Nodes</p>
              </div>
            </div>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
        ))}
      </div>
    </div>
  );
};
