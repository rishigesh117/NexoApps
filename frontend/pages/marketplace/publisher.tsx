import React from 'react';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { PublisherDashboard } from '../../components/marketplace/PublisherDashboard';

export default function MarketplacePublisherPage() {
  return (
    <>
      <Head>
        <title>Publisher Portal | NexoApps</title>
        <meta name="description" content="Publisher creator hub and package management." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <PublisherDashboard />
        </div>
      </main>
    </>
  );
}
