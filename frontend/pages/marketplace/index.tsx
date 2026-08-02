import React, { useState, useEffect } from 'react';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { MarketplaceSidebar } from '../../components/marketplace/MarketplaceSidebar';
import { MarketplaceCard } from '../../components/marketplace/MarketplaceCard';
import { getMarketplaceItems, publishMarketplaceItem } from '../../services/marketplaceService';
import { MarketplaceItem, MarketplaceStatistics } from '../../types';
import { Store, Plus, Sparkles, TrendingUp, Users, Download } from 'lucide-react';

export default function MarketplaceHomePage() {
  const [items, setItems] = useState<MarketplaceItem[]>([]);
  const [stats, setStats] = useState<MarketplaceStatistics>({ totalItems: 0, totalDownloads: 0, totalCreators: 0, activeSubscriptions: 0 });
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'AGENT' | 'MODEL' | 'TEMPLATE' | 'WORKFLOW' | 'PROMPT_PACK'>('AGENT');

  const fetchCatalog = async () => {
    try {
      const res = await getMarketplaceItems();
      setItems(res.items);
      setStats(res.stats);
    } catch {
      setItems([]);
    }
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await publishMarketplaceItem({ title, type, price: 19.00 });
      setTitle('');
      fetchCatalog();
    } catch {
      alert('Failed to publish item.');
    }
  };

  useEffect(() => {
    fetchCatalog();
  }, []);

  return (
    <>
      <SEOHead
        title="AI App Store, Agent Marketplace & Creator Platform | NexoApps"
        description="Discover, publish, and monetize AI Agents, fine-tuned models, SaaS templates, workflows, and prompt packs."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 text-left">
          <MarketplaceSidebar />

          <div className="flex-1 space-y-8 min-w-0">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-2">
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
                <Store className="w-6 h-6 text-brand-cyan" /> Enterprise AI App Store & Agent Marketplace (v2.4)
              </h1>
              <p className="text-xs sm:text-sm text-text-secondary">
                Publish, discover, and monetize autonomous AI agents, foundation model weights, SaaS app templates, and workflow automations.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="glass-panel p-5 rounded-3xl border border-white/10 space-y-1">
                <span className="text-xs text-text-muted flex items-center gap-1">
                  <Store className="w-3.5 h-3.5 text-brand-cyan" /> Total AI Assets
                </span>
                <p className="text-2xl font-black text-white">{stats.totalItems}</p>
              </div>
              <div className="glass-panel p-5 rounded-3xl border border-white/10 space-y-1">
                <span className="text-xs text-text-muted flex items-center gap-1">
                  <Download className="w-3.5 h-3.5 text-emerald-400" /> Total Downloads
                </span>
                <p className="text-2xl font-black text-white">{stats.totalDownloads}</p>
              </div>
              <div className="glass-panel p-5 rounded-3xl border border-white/10 space-y-1">
                <span className="text-xs text-text-muted flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-brand-violet" /> Verified Creators
                </span>
                <p className="text-2xl font-black text-white">{stats.totalCreators}</p>
              </div>
            </div>

            <form onSubmit={handlePublish} className="glass-panel p-5 rounded-3xl border border-white/10 flex items-center gap-3">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Asset Title (e.g. Autonomous Customer Support Agent)..."
                className="flex-1 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan"
              />
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="px-4 py-2.5 rounded-full bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan"
              >
                <option value="AGENT">Type: AI Agent</option>
                <option value="MODEL">Type: AI Model</option>
                <option value="TEMPLATE">Type: App Template</option>
                <option value="WORKFLOW">Type: Workflow</option>
                <option value="PROMPT_PACK">Type: Prompt Pack</option>
              </select>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-full text-xs font-bold text-slate-950 bg-gradient-to-r from-brand-cyan to-brand-violet hover:shadow-glow-cyan flex items-center gap-1.5 transition-all shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Publish Asset</span>
              </button>
            </form>

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
