import React, { useState } from 'react';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { TenantSidebar } from '../../components/saas/TenantSidebar';
import { Globe, Plus, CheckCircle2 } from 'lucide-react';

export default function TenantDomainsPage() {
  const [domain, setDomain] = useState('app.batlytics.dev');

  return (
    <>
      <SEOHead
        title="Custom CNAME Domains | NexoApps SaaS Console"
        description="Configure custom domain CNAME routing, SSL certificates, and white-label hostnames."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 text-left">
          <TenantSidebar />

          <div className="flex-1 space-y-8 min-w-0">
            <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
              <h1 className="text-2xl font-black text-white flex items-center gap-2">
                <Globe className="w-6 h-6 text-brand-cyan" /> Custom Domain CNAME Management
              </h1>
              <p className="text-xs text-text-secondary">
                Map custom CNAME domains to your organization workspace with automatic SSL certificates.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="font-extrabold text-white text-base">{domain}</h4>
                  <p className="text-xs font-mono text-text-muted">CNAME Target: cname.nexoapps.dev</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified & Active
                </span>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
