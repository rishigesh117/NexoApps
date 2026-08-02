import React from 'react';
import { Cpu, Activity } from 'lucide-react';

export const WorkerStatusGrid: React.FC = () => {
  const workers = [
    { name: 'worker-node-us-east-1a', node: 'node-1', status: 'active', cpu: '34.2%', ram: '62.1%', tasks: 4 },
    { name: 'worker-node-us-east-1b', node: 'node-2', status: 'active', cpu: '48.5%', ram: '71.0%', tasks: 6 },
    { name: 'worker-node-eu-west-1a', node: 'node-3', status: 'idle', cpu: '5.1%', ram: '24.3%', tasks: 0 },
  ];

  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-6">
      <h3 className="text-lg font-bold text-white">Distributed Worker Pool</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {workers.map((w) => (
          <div key={w.name} className="p-4 rounded-2xl bg-surface-100 border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-white truncate">{w.name}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-glow-cyan" />
            </div>
            <div className="flex items-center justify-between text-xs text-text-muted">
              <span>CPU: {w.cpu}</span>
              <span>RAM: {w.ram}</span>
              <span>Active Tasks: {w.tasks}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
