import React, { useState, useEffect } from 'react';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { PlatformSidebar } from '../../components/ai-platform/PlatformSidebar';
import { InferenceConsole } from '../../components/ai-platform/InferenceConsole';
import { RuntimeDashboard } from '../../components/ai-platform/RuntimeDashboard';
import { getRuntimeTelemetry } from '../../services/runtimeService';
import { RuntimeLog } from '../../types';
import { Cpu, Boxes, Rocket } from 'lucide-react';

export default function AIPlatformOverviewPage() {
  const [telemetry, setTelemetry] = useState<RuntimeLog | undefined>(undefined);

  useEffect(() => {
    getRuntimeTelemetry().then((data) => setTelemetry(data)).catch(() => {});
  }, []);

  return (
    <>
      <SEOHead
        title="Enterprise AI Deployment & Model Marketplace | NexoApps"
        description="Deploy AI models, run edge inference, manage datasets, and monitor runtime telemetry."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 text-left">
          <PlatformSidebar />

          <div className="flex-1 space-y-8 min-w-0">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-2">
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
                <Cpu className="w-6 h-6 text-brand-cyan" /> Enterprise AI Deployment & Runtime Platform (v2.3)
              </h1>
              <p className="text-xs sm:text-sm text-text-secondary">
                Model registry, simulated inference playground, dataset library, and real-time GPU telemetry cluster.
              </p>
            </div>

            <RuntimeDashboard telemetry={telemetry} />
            <InferenceConsole />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
