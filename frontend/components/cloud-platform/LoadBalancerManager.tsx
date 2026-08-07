import React from 'react';
import { Cpu, CheckCircle } from 'lucide-react';

export const LoadBalancerManager: React.FC = () => {
  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Load Balancer & Traffic Manager</h2>
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 max-w-2xl">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-white">Nexo-App-ALB (Application Load Balancer)</h3>
          <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded text-xs">Active</span>
        </div>
        <p className="text-xs font-mono text-cyan-400">nexo-alb-101.us-east-1.cloud.nexoapps.com</p>
      </div>
    </div>
  );
};
