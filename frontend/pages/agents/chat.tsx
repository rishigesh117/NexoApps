import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { AgentSidebar } from '../../components/agents/AgentSidebar';
import { AgentChatWindow } from '../../components/agents/AgentChatWindow';
import { getAIAgents } from '../../services/agentService';
import { AIAgent } from '../../types';
import { MessageSquare } from 'lucide-react';

export default function AgentChatPage() {
  const router = useRouter();
  const { agentId } = router.query;
  const [agents, setAgents] = useState<AIAgent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<AIAgent | null>(null);

  useEffect(() => {
    getAIAgents().then((data) => {
      setAgents(data);
      if (agentId) {
        const found = data.find((a) => a.id === agentId);
        if (found) setSelectedAgent(found);
      } else if (data.length > 0) {
        setSelectedAgent(data[0]);
      }
    }).catch(() => {});
  }, [agentId]);

  return (
    <>
      <SEOHead
        title="Agent Chat Studio | NexoApps AI Agents"
        description="Interactive consultation chat studio with specialized AI software engineering agents."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 text-left">
          <AgentSidebar />

          <div className="flex-1 space-y-8 min-w-0">
            <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
              <h1 className="text-2xl font-black text-white flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-brand-violet" /> AI Agent Consultation Chat Studio
              </h1>
              <p className="text-xs text-text-secondary">
                Select an agent role to receive immediate architectural, coding, or QA recommendations.
              </p>
            </div>

            {/* Agent Switcher */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
              {agents.map((ag) => (
                <button
                  key={ag.id}
                  type="button"
                  onClick={() => setSelectedAgent(ag)}
                  className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                    selectedAgent?.id === ag.id
                      ? 'bg-gradient-to-r from-brand-cyan/20 to-brand-violet/20 text-white border border-brand-cyan/40 shadow-glow-cyan'
                      : 'bg-white/5 border border-white/10 text-text-secondary hover:text-white'
                  }`}
                >
                  <span>{ag.avatar}</span>
                  <span>{ag.name}</span>
                </button>
              ))}
            </div>

            {selectedAgent && <AgentChatWindow agent={selectedAgent} />}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
