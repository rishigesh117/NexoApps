import React, { useState, useEffect } from 'react';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { MarketplaceSidebar } from '../../components/marketplace/MarketplaceSidebar';
import { getFeaturedCollections } from '../../services/marketplaceService';
import { MarketplaceCollection } from '../../types';
import { FolderHeart, Layers } from 'lucide-react';

export default function CollectionsPage() {
  const [collections, setCollections] = useState<MarketplaceCollection[]>([]);

  useEffect(() => {
    getFeaturedCollections().then((data) => setCollections(data)).catch(() => {});
  }, []);

  return (
    <>
      <SEOHead
        title="Featured AI Collections | NexoApps Marketplace"
        description="Curated collections of AI Agents, models, starter templates, and domain-specific tools."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 text-left">
          <MarketplaceSidebar />

          <div className="flex-1 space-y-8 min-w-0">
            <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
              <h1 className="text-2xl font-black text-white flex items-center gap-2">
                <FolderHeart className="w-6 h-6 text-brand-cyan" /> Featured AI Collections
              </h1>
              <p className="text-xs text-text-secondary">
                Curated asset bundles for sports analytics, web development, and LLM automation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {collections.map((col) => (
                <div key={col.id} className="glass-panel p-6 rounded-3xl border border-white/10 space-y-3 shadow-2xl">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30 flex items-center gap-1">
                      <Layers className="w-3 h-3" /> {col.itemsCount || 4} Assets
                    </span>
                  </div>
                  <h3 className="font-extrabold text-white text-base">{col.title}</h3>
                  <p className="text-xs text-text-secondary">{col.description}</p>
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
