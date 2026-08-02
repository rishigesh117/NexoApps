import React from 'react';
import { AIAgent } from '../../types';
import { MessageSquare, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface AgentCardProps {
  agent: AIAgent;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-brand-cyan/40 transition-all space-y-4 flex flex-col justify-between text-left shadow-2xl">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-3xl">{agent.avatar}</span>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            {agent.status}
          </span>
        </div>

        <div className="space-y-1">
          <h3 className="font-extrabold text-white text-base leading-tight">{agent.name}</h3>
          <p className="text-xs text-brand-cyan font-semibold">{agent.role}</p>
          <p className="text-xs text-text-secondary line-clamp-2 pt-1">{agent.description}</p>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {agent.capabilities.map((cap) => (
            <span key={cap} className="px-2 py-0.5 rounded-md bg-white/5 text-text-muted text-[10px] font-mono border border-white/5">
              {cap}
            </span>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10 pt-3">
        <Link
          href={`/agents/chat?agentId=${agent.id}`}
          className="w-full py-2 rounded-full text-xs font-bold text-slate-950 bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet hover:shadow-glow-cyan flex items-center justify-center gap-2 transition-all"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Consult Agent</span>
        </Link>
      </div>
    </div>
  );
};
