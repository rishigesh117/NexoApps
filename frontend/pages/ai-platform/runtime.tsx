import React, { useState, useEffect } from 'react';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { PlatformSidebar } from '../../components/ai-platform/PlatformSidebar';
import { RuntimeDashboard } from '../../components/ai-platform/RuntimeDashboard';
import { getRuntimeTelemetry } from '../../services/runtimeService';
import { RuntimeLog } from '../../types';
import { Activity } from 'lucide-react';

export default function RuntimePage() {
  const [telemetry, setTelemetry] = useState<RuntimeLog | undefined>(undefined);

  useEffect(() => {
    getRuntimeTelemetry().then((data) => setTelemetry(data)).catch(() => {});
  }, []);

  return (
    <>
      <SEOHead
        title="AI Runtime Telemetry & Infrastructure | NexoApps AI Platform"
        description="Monitor GPU VRAM, CPU load, inference throughput, and response latency."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 text-left">
          <PlatformSidebar />

          <div className="flex-1 space-y-8 min-w-0">
            <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
              <h1 className="text-2xl font-black text-white flex items-center gap-2">
                <Activity className="w-6 h-6 text-brand-cyan" /> AI Runtime Infrastructure & Telemetry
              </h1>
              <p className="text-xs text-text-secondary">
                Live monitoring cluster for GPU compute utilization, memory limits, and inference request rate.
              </p>
            </div>

            <RuntimeDashboard telemetry={telemetry} />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
