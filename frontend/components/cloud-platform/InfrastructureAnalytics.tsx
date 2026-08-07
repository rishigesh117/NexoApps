import React from 'react';
import { BarChart3 } from 'lucide-react';

export const InfrastructureAnalytics: React.FC = () => {
  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Cloud Infrastructure Analytics</h2>
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <h3 className="font-semibold text-white mb-4">Cluster CPU & GPU Utilization Chart</h3>
        <div className="h-40 bg-slate-900/60 rounded-lg flex items-end justify-around p-4">
          <div className="w-12 bg-cyan-500 rounded-t h-28"></div>
          <div className="w-12 bg-emerald-500 rounded-t h-36"></div>
          <div className="w-12 bg-purple-500 rounded-t h-24"></div>
        </div>
      </div>
    </div>
  );
};
