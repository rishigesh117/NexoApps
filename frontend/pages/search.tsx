import React, { useState, useEffect } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { PlatformSidebar } from '../components/platform/PlatformSidebar';
import { searchPlatform } from '../services/platformSearchService';
import { GlobalSearchResult } from '../types';
import { Search, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function UniversalSearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GlobalSearchResult[]>([]);

  const handleSearch = async (q: string) => {
    setQuery(q);
    try {
      const res = await searchPlatform(q);
      setResults(res);
    } catch {
      setResults([]);
    }
  };

  useEffect(() => {
    handleSearch('');
  }, []);

  return (
    <>
      <SEOHead
        title="Universal Cross-Platform Search | NexoApps AI OS"
        description="Search across AI Builder projects, autonomous agents, models, marketplace assets, and workspace docs."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 text-left">
          <PlatformSidebar />

          <div className="flex-1 space-y-8 min-w-0">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-4">
              <h1 className="text-2xl font-black text-white flex items-center gap-2">
                <Search className="w-6 h-6 text-brand-violet" /> Universal Cross-Platform Search Engine
              </h1>

              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-5 py-3 focus-within:border-brand-cyan transition-all">
                <Search className="w-5 h-5 text-text-muted" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search agents, models, starter templates, docs, deployments..."
                  className="flex-1 bg-transparent text-white text-xs sm:text-sm focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-3">
              {results.map((r) => (
                <Link
                  key={r.id}
                  href={r.url}
                  className="glass-panel p-5 rounded-3xl border border-white/10 hover:border-brand-cyan/40 transition-all flex items-center justify-between gap-4 block shadow-2xl"
                >
                  <div className="space-y-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-cyan/20 text-brand-cyan">
                      {r.category}
                    </span>
                    <h4 className="font-extrabold text-white text-sm">{r.title}</h4>
                    <p className="text-xs font-mono text-text-muted">{r.url}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-brand-cyan shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
