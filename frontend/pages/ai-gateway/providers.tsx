import React from 'react';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { ProviderManager } from '../../components/ai-gateway/ProviderManager';

export default function AIProvidersPage() {
  return (
    <>
      <Head>
        <title>AI Provider Ecosystem Manager | NexoApps Version 6.0</title>
        <meta name="description" content="Manage AI providers, API keys, local models, and model discovery in NexoApps Version 6.0." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <ProviderManager />
        </div>
      </main>
    </>
  );
}
