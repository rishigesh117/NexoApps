import React from 'react';
import { TrendingUp, Cpu, Server } from 'lucide-react';

export const CapacityPlanner: React.FC = () => {
  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">AI Infrastructure Capacity Planner</h2>
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 max-w-2xl">
        <h3 className="font-semibold text-white mb-2">Predicted Growth: +35.0% Next Quarter</h3>
        <p className="text-sm text-slate-300 mb-4">Recommended Provisioning Expansion:</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-slate-900 rounded text-cyan-400 font-mono text-sm">+1024 vCPUs</div>
          <div className="p-3 bg-slate-900 rounded text-emerald-400 font-mono text-sm">+128 NVIDIA H100 GPUs</div>
        </div>
      </div>
    </div>
  );
};
