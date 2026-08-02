import React, { useState, useEffect } from 'react';
import { SEOHead } from '../../../components/SEOHead';
import { Navbar } from '../../../components/Navbar';
import { Footer } from '../../../components/Footer';
import { DeveloperApiSidebar } from '../../../components/integrations/DeveloperApiSidebar';
import { getWebhooks } from '../../../services/webhookService';
import { Webhook } from '../../../types';
import { Webhook as WebhookIcon, CheckCircle2 } from 'lucide-react';

export default function DeveloperWebhooksPage() {
  const [webhooks, setWebhooks] = useState<Webhook[]>([]);

  useEffect(() => {
    getWebhooks().then((data) => setWebhooks(data)).catch(() => {});
  }, []);

  return (
    <>
      <SEOHead
        title="Webhooks Subscriptions & Delivery Logs | NexoApps Developer Portal"
        description="Subscribe HTTP endpoints to real-time events across AI Builder, Agents, Deployments, and Marketplace."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 text-left">
          <DeveloperApiSidebar />

          <div className="flex-1 space-y-8 min-w-0">
            <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
              <h1 className="text-2xl font-black text-white flex items-center gap-2">
                <WebhookIcon className="w-6 h-6 text-emerald-400" /> Webhook Subscriptions & Delivery Queue
              </h1>
              <p className="text-xs text-text-secondary">
                Receive real-time event notifications via HTTP POST payloads with automatic HMAC SHA256 signature verification.
              </p>
            </div>

            <div className="space-y-4">
              {webhooks.map((wh) => (
                <div key={wh.id} className="glass-panel p-5 rounded-3xl border border-white/10 space-y-2 shadow-2xl">
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-white text-sm font-mono">{wh.targetUrl}</h4>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Active
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {wh.events.map((ev, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-full text-[10px] bg-white/10 text-brand-cyan font-mono">
                        {ev}
                      </span>
                    ))}
                  </div>
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
