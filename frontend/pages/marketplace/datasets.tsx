import React from 'react';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { MarketplaceExplorer } from '../../components/marketplace/MarketplaceExplorer';

export default function MarketplaceDatasetsPage() {
  return (
    <>
      <Head>
        <title>AI Datasets & Fine-Tuning Store | NexoApps</title>
        <meta name="description" content="Fine-tuning data packages and benchmark datasets." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          <h1 className="text-2xl font-bold text-white">AI Datasets & Fine-Tuning Store</h1>
          <MarketplaceExplorer initialType="dataset" />
        </div>
      </main>
    </>
  );
}
