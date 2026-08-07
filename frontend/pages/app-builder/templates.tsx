import React from 'react';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { TemplateMarketplace } from '../../components/app-builder/TemplateMarketplace';

export default function AppTemplatesPage() {
  return (
    <>
      <Head>
        <title>AI Application Templates | NexoApps Version 6.1</title>
        <meta name="description" content="AI starter apps and template marketplace in NexoApps Version 6.1." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <TemplateMarketplace />
        </div>
      </main>
    </>
  );
}
