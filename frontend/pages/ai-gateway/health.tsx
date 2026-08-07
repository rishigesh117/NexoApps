import React from 'react';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { ProviderHealthGrid } from '../../components/ai-gateway/ProviderHealthGrid';
import { GatewayMonitor } from '../../components/ai-gateway/GatewayMonitor';

export default function AIHealthPage() {
  return (
    <>
      <Head>
        <title>Provider Health & Gateway Failover Monitor | NexoApps Version 6.0</title>
        <meta name="description" content="AI provider health probes, ping latency, and dynamic fallback rules." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <ProviderHealthGrid />
          <GatewayMonitor />
        </div>
      </main>
    </>
  );
}
