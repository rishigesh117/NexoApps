import React from 'react';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { MarketplaceHome } from '../../components/marketplace/MarketplaceHome';

export default function MarketplaceMainPage() {
  return (
    <>
      <Head>
        <title>AI Marketplace & Agent Ecosystem | NexoApps Version 6.2</title>
        <meta name="description" content="AI Marketplace for agents, plugins, workflows, templates & datasets." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <MarketplaceHome />
        </div>
      </main>
    </>
  );
}
