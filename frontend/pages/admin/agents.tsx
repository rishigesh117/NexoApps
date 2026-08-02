import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { AgentCard } from '../../components/agents/AgentCard';
import { getAIAgents } from '../../services/agentService';
import { AIAgent } from '../../types';
import { Bot } from 'lucide-react';

export default function AdminAgentsPage() {
  const [agents, setAgents] = useState<AIAgent[]>([]);

  useEffect(() => {
    getAIAgents().then((data) => setAgents(data)).catch(() => {});
  }, []);

  return (
    <AdminLayout title="Admin AI Agents Console | NexoApps Admin">
      <div className="space-y-8 text-left">
        <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Bot className="w-6 h-6 text-brand-cyan" /> Enterprise AI Agents Operations Console
          </h1>
          <p className="text-xs text-text-secondary">
            Manage autonomous AI agents, inspect memory stores, and review session statistics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {agents.map((ag) => (
            <AgentCard key={ag.id} agent={ag} />
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
