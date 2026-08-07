import React from 'react';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { MarketplaceCollections } from '../../components/marketplace/MarketplaceCollections';

export default function MarketplaceCollectionsPage() {
  return (
    <>
      <Head>
        <title>Featured Collections | NexoApps</title>
        <meta name="description" content="Curated featured collections and solution bundles." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <MarketplaceCollections />
        </div>
      </main>
    </>
  );
}
