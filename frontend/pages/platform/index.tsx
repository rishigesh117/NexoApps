import React, { useState, useEffect } from 'react';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { PlatformSidebar } from '../../components/platform/PlatformSidebar';
import { PlatformHealthPanel } from '../../components/platform/PlatformHealthPanel';
import { getPlatformHealth } from '../../services/platformService';
import { PlatformHealth } from '../../types';
import { Cpu, Server, Activity, ShieldCheck } from 'lucide-react';

export default function PlatformOverviewPage() {
  const [health, setHealth] = useState<PlatformHealth | undefined>(undefined);

  useEffect(() => {
    getPlatformHealth().then((h) => setHealth(h)).catch(() => {});
  }, []);

  return (
    <>
      <SEOHead
        title="Unified Platform Overview | NexoApps AI OS"
        description="Unified architecture overview connecting AI Builder, Agents, AI Platform, Cloud Sync, and Marketplace."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 text-left">
          <PlatformSidebar />

          <div className="flex-1 space-y-8 min-w-0">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-2">
              <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
                <Cpu className="w-6 h-6 text-emerald-400" /> Unified Platform Architecture & OS Core
              </h1>
              <p className="text-xs sm:text-sm text-text-secondary">
                Integrated platform engine orchestrating all modules with zero manual overhead.
              </p>
            </div>

            <PlatformHealthPanel health={health} />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
