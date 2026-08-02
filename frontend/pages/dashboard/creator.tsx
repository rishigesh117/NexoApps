import React from 'react';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Store, Plus, Upload, DollarSign } from 'lucide-react';
import Link from 'next/link';

export default function CreatorStudioDashboardPage() {
  return (
    <>
      <SEOHead
        title="AI Creator Studio | NexoApps Developer Dashboard"
        description="Publish AI Agents, models, templates, and track subscriber analytics."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-left">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl flex items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl font-black text-white flex items-center gap-2">
                <Store className="w-6 h-6 text-brand-cyan" /> AI Creator Studio Dashboard
              </h1>
              <p className="text-xs text-text-secondary">
                Manage your published AI Agents, foundation models, and template products.
              </p>
            </div>

            <Link
              href="/marketplace"
              className="px-5 py-2.5 rounded-full text-xs font-bold text-slate-950 bg-gradient-to-r from-brand-cyan to-brand-violet hover:shadow-glow-cyan flex items-center gap-1.5 transition-all shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Publish New Asset</span>
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
