import React, { useState, useEffect } from 'react';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { PlatformSidebar } from '../../components/ai-platform/PlatformSidebar';
import { fetchApi } from '../../services/apiClient';
import { EndpointKey } from '../../types';
import { Key, ShieldCheck, Copy, Check } from 'lucide-react';

export default function EndpointsPage() {
  const [keys, setKeys] = useState<EndpointKey[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchApi<{ success: boolean; data: { endpointKeys: EndpointKey[] } }>('/ai-deployments')
      .then((res) => setKeys(res.data.endpointKeys))
      .catch(() => setKeys([]));
  }, []);

  const handleCopy = (keyStr: string) => {
    navigator.clipboard.writeText(keyStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <SEOHead
        title="AI Endpoint API Keys | NexoApps AI Platform"
        description="Manage API authentication keys for model deployment inference endpoints."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 text-left">
          <PlatformSidebar />

          <div className="flex-1 space-y-8 min-w-0">
            <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
              <h1 className="text-2xl font-black text-white flex items-center gap-2">
                <Key className="w-6 h-6 text-amber-400" /> Endpoint API Keys & Authentication
              </h1>
              <p className="text-xs text-text-secondary">
                Generate and manage secret bearer keys for model inference API requests.
              </p>
            </div>

            <div className="space-y-4">
              {keys.map((k) => (
                <div key={k.id} className="glass-panel p-5 rounded-3xl border border-white/10 flex items-center justify-between gap-4 shadow-2xl">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <h4 className="font-extrabold text-white text-sm">{k.keyName}</h4>
                    </div>
                    <p className="font-mono text-xs text-brand-cyan">{k.apiKey}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(k.apiKey)}
                    className="px-4 py-2 rounded-full text-xs font-bold bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 transition-all shrink-0"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied Key!' : 'Copy Key'}</span>
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
