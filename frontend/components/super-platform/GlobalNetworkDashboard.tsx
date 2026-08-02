import React from 'react';
import { Globe, Server, Cpu, Zap } from 'lucide-react';

export const GlobalNetworkDashboard: React.FC = () => {
  const clusters = [
    { name: 'US-East Production AI Swarm Cluster', region: 'us-east-1', nodes: 16, status: 'healthy', latency: '12ms' },
    { name: 'EU-West Inference Cluster', region: 'eu-west-1', nodes: 12, status: 'healthy', latency: '28ms' },
    { name: 'AP-South Vector Processing Cluster', region: 'ap-south-1', nodes: 8, status: 'healthy', latency: '45ms' },
  ];

  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">Global AI Intelligence Network</h3>
          <p className="text-xs text-text-muted">Multi-region distributed AI clusters and cross-cloud node coordination</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {clusters.map((c) => (
          <div key={c.name} className="p-4 rounded-2xl bg-surface-100 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-white truncate">{c.name}</span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase">{c.region}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center py-2 bg-background/50 rounded-xl border border-white/5 text-xs">
              <div>
                <p className="font-bold text-white">{c.nodes}</p>
                <p className="text-[10px] text-text-muted">Nodes</p>
              </div>
              <div>
                <p className="font-bold text-brand-cyan">{c.latency}</p>
                <p className="text-[10px] text-text-muted">Latency</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
