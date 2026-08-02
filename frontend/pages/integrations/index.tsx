import React, { useState, useEffect } from 'react';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { DeveloperApiSidebar } from '../../components/integrations/DeveloperApiSidebar';
import { getIntegrationProviders } from '../../services/integrationService';
import { IntegrationProvider } from '../../types';
import { Globe, CheckCircle2 } from 'lucide-react';

export default function IntegrationsHubPage() {
  const [providers, setProviders] = useState<IntegrationProvider[]>([]);

  useEffect(() => {
    getIntegrationProviders().then((res) => setProviders(res.providers)).catch(() => {});
  }, []);

  return (
    <>
      <SEOHead
        title="Enterprise Integrations Hub | NexoApps"
        description="Connect Google, GitHub, Slack, Discord, Stripe, and Razorpay integrations to NexoApps."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 text-left">
          <DeveloperApiSidebar />

          <div className="flex-1 space-y-8 min-w-0">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-2">
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
                <Globe className="w-6 h-6 text-emerald-400" /> Enterprise Integrations Marketplace & Hub
              </h1>
              <p className="text-xs sm:text-sm text-text-secondary">
                Turnkey OAuth2 & API integrations with cloud providers, messaging bots, and payment gateways.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {providers.map((p) => (
                <div key={p.id} className="glass-panel p-6 rounded-3xl border border-white/10 space-y-3 shadow-2xl flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-white text-base">{p.name}</h4>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-cyan/20 text-brand-cyan">
                        {p.category}
                      </span>
                    </div>
                    <p className="text-xs text-text-secondary">{p.description}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => alert(`Connecting ${p.name}...`)}
                    className="w-full py-2 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 flex items-center justify-center gap-1 transition-all"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Connect Provider
                  </button>
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
