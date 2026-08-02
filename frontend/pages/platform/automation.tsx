import React, { useState, useEffect } from 'react';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { PlatformSidebar } from '../../components/platform/PlatformSidebar';
import { getAutomationRules } from '../../services/platformService';
import { AutomationRule } from '../../types';
import { Zap, CheckCircle2 } from 'lucide-react';

export default function AutomationRulesPage() {
  const [rules, setRules] = useState<AutomationRule[]>([]);

  useEffect(() => {
    getAutomationRules().then((data) => setRules(data)).catch(() => {});
  }, []);

  return (
    <>
      <SEOHead
        title="Cross-Module Automation Rules | NexoApps AI OS"
        description="Configure event-driven automation rules linking AI Builder, Agents, Deployments, and Marketplace."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 text-left">
          <PlatformSidebar />

          <div className="flex-1 space-y-8 min-w-0">
            <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
              <h1 className="text-2xl font-black text-white flex items-center gap-2">
                <Zap className="w-6 h-6 text-amber-400" /> Cross-Module Event-Driven Automation Rules
              </h1>
              <p className="text-xs text-text-secondary">
                Automate workflows between AI Builder, Code Review Agents, Model Deployments, and Marketplace publishing.
              </p>
            </div>

            <div className="space-y-4">
              {rules.map((rule) => (
                <div key={rule.id} className="glass-panel p-5 rounded-3xl border border-white/10 flex items-center justify-between gap-4 shadow-2xl">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-400" />
                      <h4 className="font-extrabold text-white text-sm">{rule.name}</h4>
                    </div>
                    <p className="text-xs text-text-muted">
                      Trigger: <span className="text-brand-cyan font-mono">{rule.triggerEvent}</span> → Action: <span className="text-emerald-400 font-mono">{rule.actionTarget}</span>
                    </p>
                  </div>

                  <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 shrink-0">
                    <CheckCircle2 className="w-3 h-3" /> Active Rule
                  </span>
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
