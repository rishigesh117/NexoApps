import React, { useState, useEffect } from 'react';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { BuilderSidebar } from '../../components/builder/BuilderSidebar';
import { getPromptHistory } from '../../services/builderService';
import { PromptHistory } from '../../types';
import { History, Sparkles } from 'lucide-react';

export default function BuilderHistoryPage() {
  const [history, setHistory] = useState<PromptHistory[]>([]);

  useEffect(() => {
    getPromptHistory().then((data) => setHistory(data)).catch(() => {});
  }, []);

  return (
    <>
      <SEOHead
        title="AI Prompt Generation History | NexoApps AI Builder"
        description="Inspect past AI code scaffolding prompts, tokens consumed, and generated file summaries."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 text-left">
          <BuilderSidebar />

          <div className="flex-1 space-y-8 min-w-0">
            <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
              <h1 className="text-2xl font-black text-white flex items-center gap-2">
                <History className="w-6 h-6 text-brand-cyan" /> Prompt Generation History
              </h1>
              <p className="text-xs text-text-secondary">
                Audit history of AI application prompts, token usage, and response summaries.
              </p>
            </div>

            <div className="space-y-4">
              {history.map((h) => (
                <div key={h.id} className="glass-panel p-5 rounded-3xl border border-white/10 space-y-2 text-xs shadow-2xl">
                  <div className="flex items-center justify-between text-text-muted">
                    <span className="font-mono text-brand-cyan">{new Date(h.createdAt).toLocaleString()}</span>
                    <span>{h.tokensUsed} Tokens</span>
                  </div>
                  <p className="font-bold text-white text-sm">"{h.promptText}"</p>
                  <p className="text-text-secondary">{h.responseSummary}</p>
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
