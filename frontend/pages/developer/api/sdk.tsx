import React, { useState, useEffect } from 'react';
import { SEOHead } from '../../../components/SEOHead';
import { Navbar } from '../../../components/Navbar';
import { Footer } from '../../../components/Footer';
import { DeveloperApiSidebar } from '../../../components/integrations/DeveloperApiSidebar';
import { getSdks } from '../../../services/developerApiService';
import { SdkDownload } from '../../../types';
import { Download, Code2 } from 'lucide-react';

export default function DeveloperSdkPage() {
  const [sdks, setSdks] = useState<SdkDownload[]>([]);

  useEffect(() => {
    getSdks().then((data) => setSdks(data)).catch(() => {});
  }, []);

  return (
    <>
      <SEOHead
        title="Official SDK Downloads & Client Libraries | NexoApps Developer Portal"
        description="Download official NexoApps SDK packages for Node.js, Python, Go, and Java."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 text-left">
          <DeveloperApiSidebar />

          <div className="flex-1 space-y-8 min-w-0">
            <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
              <h1 className="text-2xl font-black text-white flex items-center gap-2">
                <Download className="w-6 h-6 text-brand-cyan" /> Official SDK Downloads & Code Libraries
              </h1>
              <p className="text-xs text-text-secondary">
                Accelerate integration with type-safe SDK packages published on npm, PyPI, and Go Modules.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sdks.map((sdk) => (
                <div key={sdk.id} className="glass-panel p-6 rounded-3xl border border-white/10 space-y-3 shadow-2xl flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-white text-base">{sdk.language} SDK</h4>
                      <span className="text-xs font-mono text-brand-cyan">{sdk.version}</span>
                    </div>
                    <p className="text-xs text-text-muted">{sdk.downloadCount.toLocaleString()} Downloads</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => alert(`Downloading ${sdk.language} SDK ${sdk.version}...`)}
                    className="w-full py-2 rounded-full text-xs font-bold text-slate-950 bg-gradient-to-r from-brand-cyan to-brand-violet hover:shadow-glow-cyan flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Download className="w-3.5 h-3.5" /> Download Library
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
