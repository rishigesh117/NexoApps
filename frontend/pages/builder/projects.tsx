import React, { useState, useEffect } from 'react';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { BuilderSidebar } from '../../components/builder/BuilderSidebar';
import { getAIProjects } from '../../services/builderService';
import { AIProject } from '../../types';
import { FolderGit2, FileCode, Clock } from 'lucide-react';
import Link from 'next/link';

export default function BuilderProjectsPage() {
  const [projects, setProjects] = useState<AIProject[]>([]);

  useEffect(() => {
    getAIProjects().then((data) => setProjects(data)).catch(() => {});
  }, []);

  return (
    <>
      <SEOHead
        title="AI Projects Directory | NexoApps AI Builder"
        description="Inspect AI-scaffolded application repositories, generated files, and code structures."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 text-left">
          <BuilderSidebar />

          <div className="flex-1 space-y-8 min-w-0">
            <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
              <h1 className="text-2xl font-black text-white flex items-center gap-2">
                <FolderGit2 className="w-6 h-6 text-brand-violet" /> AI Generated Projects Directory
              </h1>
              <p className="text-xs text-text-secondary">
                Review all AI scaffolded application codebases, file trees, and generation prompts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((p) => (
                <div key={p.id} className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 shadow-2xl">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-brand-cyan uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/20">
                      {p.framework}
                    </span>
                    <h3 className="font-extrabold text-white text-base leading-tight pt-1">{p.name}</h3>
                    <p className="text-xs text-text-secondary line-clamp-2">{p.description}</p>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/10 pt-3 text-xs text-text-muted">
                    <span className="flex items-center gap-1">
                      <FileCode className="w-3.5 h-3.5 text-brand-violet" /> {p.filesCount || 6} Files
                    </span>
                    <Link
                      href={`/builder/project/${p.id}`}
                      className="px-4 py-1.5 rounded-full text-xs font-bold text-slate-950 bg-gradient-to-r from-brand-cyan to-brand-violet hover:shadow-glow-cyan transition-all"
                    >
                      Inspect Code Studio
                    </Link>
                  </div>
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
