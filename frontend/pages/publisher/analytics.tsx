import React from 'react';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { MarketplaceAnalytics } from '../../components/marketplace/MarketplaceAnalytics';

export default function PublisherAnalyticsPage() {
  return (
    <>
      <Head>
        <title>Publisher Analytics | NexoApps</title>
        <meta name="description" content="Sales, downloads, and conversion telemetry for publishers." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <MarketplaceAnalytics />
        </div>
      </main>
    </>
  );
}
