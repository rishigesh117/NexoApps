import React, { useState, useEffect } from 'react';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { MarketplaceSidebar } from '../../components/marketplace/MarketplaceSidebar';
import { MarketplaceCard } from '../../components/marketplace/MarketplaceCard';
import { getMarketplaceItems } from '../../services/marketplaceService';
import { MarketplaceItem } from '../../types';
import { Workflow } from 'lucide-react';

export default function WorkflowMarketplacePage() {
  const [items, setItems] = useState<MarketplaceItem[]>([]);

  useEffect(() => {
    getMarketplaceItems('WORKFLOW').then((res) => setItems(res.items)).catch(() => {});
  }, []);

  return (
    <>
      <SEOHead
        title="Automation Workflow Marketplace | NexoApps Marketplace"
        description="Automated CI/CD pipelines, AI agent automation flows, and cloud deployment workflows."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 text-left">
          <MarketplaceSidebar />

          <div className="flex-1 space-y-8 min-w-0">
            <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
              <h1 className="text-2xl font-black text-white flex items-center gap-2">
                <Workflow className="w-6 h-6 text-amber-400" /> Automation Workflow & Pipeline Marketplace
              </h1>
              <p className="text-xs text-text-secondary">
                Pre-built automation DAGs, agent orchestration flows, and enterprise CI/CD pipelines.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {items.map((item) => (
                <MarketplaceCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
