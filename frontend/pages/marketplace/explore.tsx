import React from 'react';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { MarketplaceExplorer } from '../../components/marketplace/MarketplaceExplorer';

export default function MarketplaceExplorePage() {
  return (
    <>
      <Head>
        <title>Explore AI Packages & Extensions | NexoApps</title>
        <meta name="description" content="Search and filter AI agents, plugins, workflows, templates, and datasets." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <MarketplaceExplorer />
        </div>
      </main>
    </>
  );
}
