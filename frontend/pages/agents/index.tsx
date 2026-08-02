import React, { useState, useEffect } from 'react';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { AgentSidebar } from '../../components/agents/AgentSidebar';
import { AgentCard } from '../../components/agents/AgentCard';
import { getAIAgents } from '../../services/agentService';
import { AIAgent } from '../../types';
import { Bot } from 'lucide-react';

export default function AgentsHubPage() {
  const [agents, setAgents] = useState<AIAgent[]>([]);

  useEffect(() => {
    getAIAgents().then((data) => setAgents(data)).catch(() => {});
  }, []);

  return (
    <>
      <SEOHead
        title="Autonomous AI Development Agents | NexoApps"
        description="Multi-agent AI software engineering platform for project planning, code generation, PR reviews, and automated documentation."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 text-left">
          <AgentSidebar />

          <div className="flex-1 space-y-8 min-w-0">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-2">
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
                <Bot className="w-6 h-6 text-brand-cyan" /> Autonomous AI Development Agents Hub (v2.2)
              </h1>
              <p className="text-xs sm:text-sm text-text-secondary">
                Collaborate with specialized AI Software Engineers, Project Planners, QA Leads, and Technical Writers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {agents.map((ag) => (
                <AgentCard key={ag.id} agent={ag} />
              ))}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
