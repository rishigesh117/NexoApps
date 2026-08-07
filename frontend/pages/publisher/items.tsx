import React from 'react';
import Head from 'next/head';
import { Store, Plus } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { MarketplaceExplorer } from '../../components/marketplace/MarketplaceExplorer';

export default function PublisherItemsPage() {
  return (
    <>
      <Head>
        <title>Publisher Packages & Items | NexoApps</title>
        <meta name="description" content="Publisher created packages and item management." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Store className="w-6 h-6 text-brand-cyan" />
              Your Published Marketplace Items
            </h1>
            <button className="px-4 py-2 rounded-xl bg-brand-cyan text-slate-950 font-bold text-xs shadow-glow-cyan flex items-center gap-2">
              <Plus className="w-4 h-4" /> Publish New Package
            </button>
          </div>
          <MarketplaceExplorer />
        </div>
      </main>
    </>
  );
}
