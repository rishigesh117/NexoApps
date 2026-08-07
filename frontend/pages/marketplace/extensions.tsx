import React from 'react';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { ExtensionManager } from '../../components/marketplace/ExtensionManager';

export default function MarketplaceExtensionsPage() {
  return (
    <>
      <Head>
        <title>Extension SDK Platform | NexoApps</title>
        <meta name="description" content="Platform extension SDK packages & enterprise modules." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ExtensionManager />
        </div>
      </main>
    </>
  );
}
