import React from 'react';
import { Layers, Cpu, Server, HardDrive, Network } from 'lucide-react';

export const InfrastructureExplorer: React.FC = () => {
  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Cloud Infrastructure Resource Explorer</h2>
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <h3 className="font-semibold text-white mb-4">Provisioned Compute & Cluster Stack</h3>
        <div className="space-y-3">
          <div className="p-4 bg-slate-900/60 rounded-lg border border-slate-700 flex justify-between items-center">
            <span className="font-medium text-white">NexoKube AI Engine (16 Nodes / 32 H100 GPUs)</span>
            <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded font-semibold">Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
};
