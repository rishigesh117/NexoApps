import React from 'react';
import { Box, Server, Layers } from 'lucide-react';

export const ContainerManager: React.FC = () => {
  const containers = [
    { name: 'nexo-app-runner-01', image: 'nexoapps/runtime:v5.1', status: 'running', ports: '3000:3000, 5000:5000' },
    { name: 'nexo-python-infer-01', image: 'nexoapps/pytorch-inference:v2.1', status: 'running', ports: '8080:8080' },
  ];

  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-6">
      <h3 className="text-lg font-bold text-white">Runtime Container Registry & Management</h3>
      <div className="space-y-3">
        {containers.map((c) => (
          <div key={c.name} className="p-4 rounded-2xl bg-surface-100 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Box className="w-4 h-4 text-violet-400" />
              <div>
                <h4 className="font-mono text-xs font-bold text-white">{c.name}</h4>
                <p className="text-[10px] text-text-muted font-mono mt-0.5">{c.image} • Ports: {c.ports}</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold capitalize">
              {c.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
