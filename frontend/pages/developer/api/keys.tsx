import React, { useState, useEffect } from 'react';
import { SEOHead } from '../../../components/SEOHead';
import { Navbar } from '../../../components/Navbar';
import { Footer } from '../../../components/Footer';
import { DeveloperApiSidebar } from '../../../components/integrations/DeveloperApiSidebar';
import { ApiKeyCard } from '../../../components/integrations/ApiKeyCard';
import { getDeveloperApiKeys } from '../../../services/developerApiService';
import { DeveloperApiKey } from '../../../types';
import { Key, Plus } from 'lucide-react';

export default function DeveloperApiKeysPage() {
  const [keys, setKeys] = useState<DeveloperApiKey[]>([]);

  useEffect(() => {
    getDeveloperApiKeys().then((data) => setKeys(data)).catch(() => {});
  }, []);

  return (
    <>
      <SEOHead
        title="API Keys & Tokens | NexoApps Developer Portal"
        description="Generate, revoke, and rotate developer API keys for server-to-server REST authentication."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 text-left">
          <DeveloperApiSidebar />

          <div className="flex-1 space-y-8 min-w-0">
            <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
              <h1 className="text-2xl font-black text-white flex items-center gap-2">
                <Key className="w-6 h-6 text-amber-400" /> Developer API Secret Keys
              </h1>
              <p className="text-xs text-text-secondary">
                Authenticate requests to NexoApps API Gateway using bearer tokens.
              </p>
            </div>

            <div className="space-y-4">
              {keys.map((k) => (
                <ApiKeyCard key={k.id} apiKey={k} />
              ))}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
