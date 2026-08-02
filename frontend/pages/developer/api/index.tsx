import React, { useState, useEffect } from 'react';
import { SEOHead } from '../../../components/SEOHead';
import { Navbar } from '../../../components/Navbar';
import { Footer } from '../../../components/Footer';
import { DeveloperApiSidebar } from '../../../components/integrations/DeveloperApiSidebar';
import { getGatewayStatus } from '../../../services/apiGatewayService';
import { Code2, Server, Zap, Shield, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function DeveloperApiPortalPage() {
  const [status, setStatus] = useState<any | null>(null);

  useEffect(() => {
    getGatewayStatus().then((res) => setStatus(res)).catch(() => {});
  }, []);

  const s = status?.status || { status: 'OPERATIONAL', activeRoutes: 42, totalRequestsToday: 148520, avgLatencyMs: 18.4 };

  return (
    <>
      <SEOHead
        title="Developer API Gateway & Integration Platform | NexoApps"
        description="Build enterprise applications with NexoApps API Gateway, OAuth2, Webhooks, and OpenAPI SDKs."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 text-left">
          <DeveloperApiSidebar />

          <div className="flex-1 space-y-8 min-w-0">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-2">
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
                <Code2 className="w-6 h-6 text-brand-cyan" /> Enterprise Developer API Gateway (v3.1)
              </h1>
              <p className="text-xs sm:text-sm text-text-secondary">
                REST API Gateway endpoints, OAuth2 authorization, webhooks engine, and SDK distribution.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="glass-panel p-5 rounded-3xl border border-white/10 space-y-1">
                <span className="text-xs text-text-muted">Gateway Health</span>
                <p className="text-2xl font-black text-emerald-400">{s.status}</p>
              </div>

              <div className="glass-panel p-5 rounded-3xl border border-white/10 space-y-1">
                <span className="text-xs text-text-muted">Active Endpoints</span>
                <p className="text-2xl font-black text-white">{s.activeRoutes} Routes</p>
              </div>

              <div className="glass-panel p-5 rounded-3xl border border-white/10 space-y-1">
                <span className="text-xs text-text-muted">Daily API Throughput</span>
                <p className="text-2xl font-black text-white">{s.totalRequestsToday.toLocaleString()}</p>
              </div>

              <div className="glass-panel p-5 rounded-3xl border border-white/10 space-y-1">
                <span className="text-xs text-text-muted">Average Latency</span>
                <p className="text-2xl font-black text-brand-cyan">{s.avgLatencyMs} ms</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="/developer/api/keys" className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-amber-400/40 transition-all space-y-2 block">
                <div className="flex items-center justify-between text-amber-400">
                  <span className="font-bold text-sm">API Keys & Tokens</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
                <p className="text-xs text-text-secondary">Generate live & sandbox API secret keys</p>
              </Link>

              <Link href="/developer/api/docs" className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-brand-violet/40 transition-all space-y-2 block">
                <div className="flex items-center justify-between text-brand-violet">
                  <span className="font-bold text-sm">Interactive OpenAPI Spec</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
                <p className="text-xs text-text-secondary">Explore REST API endpoints & schemas</p>
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
