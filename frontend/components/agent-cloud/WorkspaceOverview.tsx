import React from 'react';
import { Bot, Layers, Cpu, Zap, Activity } from 'lucide-react';

export const WorkspaceOverview: React.FC = () => {
  const workspaces = [
    { id: 'ws-1', name: 'Production AI Swarm Workspace', environment: 'production', agents: 3, activeJobs: 12, health: '99.4%' },
    { id: 'ws-2', name: 'Data Engineering Agent Swarm', environment: 'production', agents: 4, activeJobs: 8, health: '98.9%' },
    { id: 'ws-3', name: 'Customer Support AI Swarm', environment: 'staging', agents: 2, activeJobs: 5, health: '100%' },
  ];

  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">Multi-Agent Workspaces</h3>
          <p className="text-xs text-text-muted">Orchestrate collaborative AI agent swarms across cloud environments</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {workspaces.map((ws) => (
          <div key={ws.id} className="p-4 rounded-2xl bg-surface-100 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-white truncate">{ws.name}</span>
              <span className="px-2 py-0.5 rounded-md bg-brand-cyan/20 text-brand-cyan text-[10px] font-bold uppercase">{ws.environment}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center py-2 bg-background/50 rounded-xl border border-white/5 text-xs">
              <div>
                <p className="font-bold text-white">{ws.agents}</p>
                <p className="text-[10px] text-text-muted">Agents</p>
              </div>
              <div>
                <p className="font-bold text-emerald-400">{ws.activeJobs}</p>
                <p className="text-[10px] text-text-muted">Jobs</p>
              </div>
              <div>
                <p className="font-bold text-brand-cyan">{ws.health}</p>
                <p className="text-[10px] text-text-muted">Health</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
