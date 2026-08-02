import React, { useState, useEffect } from 'react';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { BuilderSidebar } from '../../components/builder/BuilderSidebar';
import { TemplateGallery } from '../../components/builder/TemplateGallery';
import { getAITemplates } from '../../services/templateService';
import { AITemplate } from '../../types';
import { LayoutGrid } from 'lucide-react';

export default function BuilderTemplatesPage() {
  const [templates, setTemplates] = useState<AITemplate[]>([]);

  useEffect(() => {
    getAITemplates().then((data) => setTemplates(data)).catch(() => {});
  }, []);

  return (
    <>
      <SEOHead
        title="AI App Template Marketplace | NexoApps AI Builder"
        description="Browse pre-built full-stack application boilerplates, sports scoring suites, AI chat interfaces, and SaaS dashboards."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 text-left">
          <BuilderSidebar />

          <div className="flex-1 space-y-8 min-w-0">
            <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
              <h1 className="text-2xl font-black text-white flex items-center gap-2">
                <LayoutGrid className="w-6 h-6 text-emerald-400" /> Reusable Application Template Marketplace
              </h1>
              <p className="text-xs text-text-secondary">
                Select production-ready application boilerplates and launch your project with one click.
              </p>
            </div>

            <TemplateGallery templates={templates} />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
