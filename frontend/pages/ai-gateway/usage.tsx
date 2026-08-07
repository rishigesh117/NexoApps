import React from 'react';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { UsageDashboard } from '../../components/ai-gateway/UsageDashboard';

export default function AIUsagePage() {
  return (
    <>
      <Head>
        <title>Token Analytics & Financial Telemetry | NexoApps Version 6.0</title>
        <meta name="description" content="Real-time token usage, cost accounting, and request telemetry in NexoApps Version 6.0." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <UsageDashboard />
        </div>
      </main>
    </>
  );
}
