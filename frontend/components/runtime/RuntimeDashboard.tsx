import React from 'react';
import { Cpu, Zap, Server, ShieldCheck, Play } from 'lucide-react';

export const RuntimeDashboard: React.FC = () => {
  const environments = [
    { name: 'Production Node.js Sandboxed Engine', mode: 'sandboxed', instances: 4, memory: '512 MB', cpu: '1.0 Core', status: 'healthy' },
    { name: 'Python AI Inference Sandbox', mode: 'containerized', instances: 2, memory: '2048 MB', cpu: '2.0 Cores', status: 'healthy' },
    { name: 'Serverless Edge Runtime', mode: 'v8_isolate', instances: 12, memory: '128 MB', cpu: '0.5 Cores', status: 'healthy' },
  ];

  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">AI Sandboxed Runtime Environments</h3>
          <p className="text-xs text-text-muted">Isolated execution engines for AI applications, serverless functions, and agents</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {environments.map((env) => (
          <div key={env.name} className="p-4 rounded-2xl bg-surface-100 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-white truncate">{env.name}</span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase">{env.mode}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center py-2 bg-background/50 rounded-xl border border-white/5 text-xs">
              <div>
                <p className="font-bold text-white">{env.instances}</p>
                <p className="text-[10px] text-text-muted">Instances</p>
              </div>
              <div>
                <p className="font-bold text-brand-cyan">{env.memory}</p>
                <p className="text-[10px] text-text-muted">RAM Limit</p>
              </div>
              <div>
                <p className="font-bold text-violet-400">{env.cpu}</p>
                <p className="text-[10px] text-text-muted">CPU Limit</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
