import React from 'react';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { MarketplaceExplorer } from '../../components/marketplace/MarketplaceExplorer';

export default function MarketplaceTemplatesPage() {
  return (
    <>
      <Head>
        <title>App & UI Templates | NexoApps</title>
        <meta name="description" content="AI starter app templates and visual UI packages." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          <h1 className="text-2xl font-bold text-white">App & UI Template Marketplace</h1>
          <MarketplaceExplorer initialType="template" />
        </div>
      </main>
    </>
  );
}
