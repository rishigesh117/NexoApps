import React from 'react';
import { Server, Cpu, HardDrive, Network, CheckCircle2 } from 'lucide-react';

export const InfrastructureOverview: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Server className="w-6 h-6 text-brand-cyan" /> Distributed Infrastructure Topology
        </h2>
        <p className="text-text-muted text-sm">Cluster nodes, virtual networks, and multi-region compute pools</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Cpu className="w-5 h-5 text-brand-cyan" /> Kubernetes Clusters
            </h3>
            <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-full">Healthy</span>
          </div>
          <p className="text-xs text-text-muted">3 Multi-zone nodes • Autoscaling enabled (3-30 pods)</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <HardDrive className="w-5 h-5 text-purple-400" /> S3 Storage Layer
            </h3>
            <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-full">Active</span>
          </div>
          <p className="text-xs text-text-muted">High IOPS NVMe & object storage provider active</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Network className="w-5 h-5 text-cyan-400" /> CDN Edge Network
            </h3>
            <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-full">Active</span>
          </div>
          <p className="text-xs text-text-muted">300+ Edge locations with global caching enabled</p>
        </div>
      </div>
    </div>
  );
};
