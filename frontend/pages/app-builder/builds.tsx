import React from 'react';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { BuildHistory } from '../../components/app-builder/BuildHistory';

export default function AppBuildsPage() {
  return (
    <>
      <Head>
        <title>Build Pipeline & History | NexoApps Version 6.1</title>
        <meta name="description" content="Compilation build history and console logs in NexoApps Version 6.1." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <BuildHistory />
        </div>
      </main>
    </>
  );
}
