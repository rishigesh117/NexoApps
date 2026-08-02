import React from 'react';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { BuilderSidebar } from '../../components/builder/BuilderSidebar';
import { ExportPanel } from '../../components/builder/ExportPanel';
import { DownloadCloud } from 'lucide-react';

export default function BuilderExportPage() {
  return (
    <>
      <SEOHead
        title="Project Export Center | NexoApps AI Builder"
        description="Export generated full-stack codebases as ready-to-run ZIP packages, Next.js App Router projects, React applications, or Node.js Express APIs."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 text-left">
          <BuilderSidebar />

          <div className="flex-1 space-y-8 min-w-0">
            <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
              <h1 className="text-2xl font-black text-white flex items-center gap-2">
                <DownloadCloud className="w-6 h-6 text-brand-cyan" /> Project Export Center
              </h1>
              <p className="text-xs text-text-secondary">
                Package and download full production-ready codebases with zero vendor lock-in.
              </p>
            </div>

            <ExportPanel />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
