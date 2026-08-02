import React, { useState, useEffect } from 'react';
import { SEOHead } from '../../../components/SEOHead';
import { Navbar } from '../../../components/Navbar';
import { Footer } from '../../../components/Footer';
import { DeveloperApiSidebar } from '../../../components/integrations/DeveloperApiSidebar';
import { getApiDocs } from '../../../services/developerApiService';
import { BookOpen } from 'lucide-react';

export default function DeveloperApiDocsPage() {
  const [docs, setDocs] = useState<any | null>(null);

  useEffect(() => {
    getApiDocs().then((data) => setDocs(data)).catch(() => {});
  }, []);

  const d = docs || { info: { title: 'NexoApps REST API', version: 'v3.1.0' }, paths: {} };

  return (
    <>
      <SEOHead
        title="Interactive OpenAPI / Swagger Documentation | NexoApps Developer Portal"
        description="Explore REST API endpoints, request schemas, parameters, and authentication headers."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 text-left">
          <DeveloperApiSidebar />

          <div className="flex-1 space-y-8 min-w-0">
            <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
              <h1 className="text-2xl font-black text-white flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-rose-400" /> Interactive OpenAPI (Swagger v3.1) Specification
              </h1>
              <p className="text-xs text-text-secondary">
                Comprehensive API documentation schema and interactive endpoint tester.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 shadow-2xl font-mono text-xs text-text-secondary">
              <h3 className="font-bold text-white text-sm font-sans">{d.info?.title} ({d.info?.version})</h3>
              <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 space-y-2">
                {Object.keys(d.paths || {}).map((path) => (
                  <div key={path} className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400">GET</span>
                    <span className="text-white">{path}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
