import React, { useState, useEffect } from 'react';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { DeveloperApiSidebar } from '../../components/integrations/DeveloperApiSidebar';
import { getIntegrationProviders } from '../../services/integrationService';
import { IntegrationProvider } from '../../types';
import { Globe } from 'lucide-react';

export default function IntegrationProvidersPage() {
  const [providers, setProviders] = useState<IntegrationProvider[]>([]);

  useEffect(() => {
    getIntegrationProviders().then((res) => setProviders(res.providers)).catch(() => {});
  }, []);

  return (
    <>
      <SEOHead
        title="Connected Integration Providers | NexoApps"
        description="View all active cloud integration accounts and OAuth scopes."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 text-left">
          <DeveloperApiSidebar />

          <div className="flex-1 space-y-8 min-w-0">
            <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
              <h1 className="text-2xl font-black text-white flex items-center gap-2">
                <Globe className="w-6 h-6 text-brand-cyan" /> Connected Integration Accounts & Scopes
              </h1>
              <p className="text-xs text-text-secondary">
                Manage active integrations linked to your developer workspace.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {providers.map((p) => (
                <div key={p.id} className="glass-panel p-6 rounded-3xl border border-white/10 space-y-2 shadow-2xl">
                  <h4 className="font-extrabold text-white text-base">{p.name}</h4>
                  <p className="text-xs text-text-muted">{p.description}</p>
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
