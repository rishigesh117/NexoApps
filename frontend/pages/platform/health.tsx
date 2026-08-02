import React, { useState, useEffect } from 'react';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { PlatformSidebar } from '../../components/platform/PlatformSidebar';
import { PlatformHealthPanel } from '../../components/platform/PlatformHealthPanel';
import { getPlatformHealth } from '../../services/platformService';
import { PlatformHealth } from '../../types';
import { Activity } from 'lucide-react';

export default function SystemHealthPage() {
  const [health, setHealth] = useState<PlatformHealth | undefined>(undefined);

  useEffect(() => {
    getPlatformHealth().then((h) => setHealth(h)).catch(() => {});
  }, []);

  return (
    <>
      <SEOHead
        title="System Health & Cluster Telemetry | NexoApps AI OS"
        description="Monitor platform uptime, GPU compute utilization, edge pod replicas, and request latency."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 text-left">
          <PlatformSidebar />

          <div className="flex-1 space-y-8 min-w-0">
            <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
              <h1 className="text-2xl font-black text-white flex items-center gap-2">
                <Activity className="w-6 h-6 text-brand-cyan" /> System Health Dashboard & Infrastructure Telemetry
              </h1>
              <p className="text-xs text-text-secondary">
                Real-time health telemetry across inference clusters, database connection pools, and edge pods.
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
