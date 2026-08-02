import React from 'react';
import { Bot, Shield, Plus, Sparkles } from 'lucide-react';

export const AgentManager: React.FC = () => {
  const agents = [
    { name: 'Architect Agent Alpha', role: 'System Architect', model: 'gemini-1.5-pro', status: 'active', temp: 0.2 },
    { name: 'DevOps Orchestrator Beta', role: 'DevOps Engineer', model: 'gemini-1.5-pro', status: 'active', temp: 0.3 },
    { name: 'QA Test Automation Gamma', role: 'QA Engineer', model: 'gemini-1.5-flash', status: 'idle', temp: 0.5 },
  ];

  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">Workspace Agent Manager</h3>
          <p className="text-xs text-text-muted">Deploy, configure, and monitor intelligent AI agents in your swarm</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue text-white text-xs font-bold shadow-glow-cyan hover:opacity-95 transition-all">
          <Plus className="w-3.5 h-3.5" /> Provision Agent
        </button>
      </div>

      <div className="space-y-3">
        {agents.map((ag) => (
          <div key={ag.name} className="p-4 rounded-2xl bg-surface-100 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-cyan to-brand-violet flex items-center justify-center text-white">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-2">
                  <span>{ag.name}</span>
                  <span className="px-2 py-0.5 rounded-md bg-white/10 text-text-secondary text-[10px] font-normal">{ag.role}</span>
                </h4>
                <p className="text-[10px] text-text-muted font-mono mt-0.5">Model: {ag.model} • Temp: {ag.temp}</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold capitalize">
              {ag.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
