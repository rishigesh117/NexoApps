import React from 'react';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { MarketplaceExplorer } from '../../components/marketplace/MarketplaceExplorer';

export default function MarketplaceWorkflowsPage() {
  return (
    <>
      <Head>
        <title>Visual AI Workflows Marketplace | NexoApps</title>
        <meta name="description" content="Node-based visual automation workflow packages." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          <h1 className="text-2xl font-bold text-white">Visual AI Workflows Marketplace</h1>
          <MarketplaceExplorer initialType="workflow" />
        </div>
      </main>
    </>
  );
}
