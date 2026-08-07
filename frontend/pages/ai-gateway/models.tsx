import React from 'react';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { AIModelComparison } from '../../components/ai-gateway/AIModelComparison';

export default function AIModelsPage() {
  return (
    <>
      <Head>
        <title>Universal AI Model Catalog & Benchmarks | NexoApps Version 6.0</title>
        <meta name="description" content="AI model catalog, MMLU benchmarks, context windows, and cost comparison." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <AIModelComparison />
        </div>
      </main>
    </>
  );
}
