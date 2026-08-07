import React from 'react';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { PluginManager } from '../../components/marketplace/PluginManager';

export default function MarketplacePluginsPage() {
  return (
    <>
      <Head>
        <title>Plugin Registry & Connector Hub | NexoApps</title>
        <meta name="description" content="Manage enterprise plugins and API connectors." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <PluginManager />
        </div>
      </main>
    </>
  );
}
