import React from 'react';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { AgentSidebar } from '../../components/agents/AgentSidebar';
import { Activity, Bot, CheckCircle2, Zap } from 'lucide-react';

export default function AgentActivityPage() {
  const activities = [
    { id: '1', agent: 'Nexus Lead Architect', action: 'Generated PostgreSQL match schema for Batlytics v2.2', time: '10 mins ago' },
    { id: '2', agent: 'Sentinel Security QA', action: 'Executed static vulnerability scan across 35 API routes', time: '25 mins ago' },
    { id: '3', agent: 'Scribe Technical Writer', action: 'Authored Version 2.2 OpenAPI Architecture Reference', time: '1 hour ago' },
    { id: '4', agent: 'Hyperion Code Reviewer', action: 'Approved PR #142 (Phase 6B Autonomous AI Agents)', time: '2 hours ago' },
  ];

  return (
    <>
      <SEOHead
        title="Agent Development Activity Feed | NexoApps AI Agents"
        description="Real-time multi-agent development activity stream and execution history."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 text-left">
          <AgentSidebar />

          <div className="flex-1 space-y-8 min-w-0">
            <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
              <h1 className="text-2xl font-black text-white flex items-center gap-2">
                <Activity className="w-6 h-6 text-brand-cyan" /> Multi-Agent Development Activity Stream
              </h1>
              <p className="text-xs text-text-secondary">
                Live activity feed of code scaffolding, PR reviews, bug scans, and doc authoring.
              </p>
            </div>

            <div className="space-y-3">
              {activities.map((act) => (
                <div key={act.id} className="glass-panel p-5 rounded-3xl border border-white/10 flex items-center justify-between gap-4 shadow-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan shrink-0">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-white text-sm">{act.agent}</h4>
                      <p className="text-xs text-text-secondary">{act.action}</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-text-muted shrink-0">{act.time}</span>
                </div>
              ))}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
