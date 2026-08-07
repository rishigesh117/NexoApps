import React from 'react';
import Head from 'next/head';
import { Store } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { MarketplaceExplorer } from '../../components/marketplace/MarketplaceExplorer';

export default function AdminMarketplacePage() {
  return (
    <>
      <Head>
        <title>Marketplace Platform Console | NexoApps Admin</title>
        <meta name="description" content="AI Marketplace administration console." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <AdminSidebar />
            <div className="flex-1 min-w-0 space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-display font-bold text-white flex items-center gap-2">
                    <Store className="w-6 h-6 text-brand-cyan" />
                    AI Marketplace & Extension Platform Administration
                  </h1>
                  <p className="text-xs text-text-secondary">Version 6.2 Ecosystem Management & Item Moderation</p>
                </div>
              </div>

              <MarketplaceExplorer />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
