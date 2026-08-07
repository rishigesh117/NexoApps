import React from 'react';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { EnvironmentManager } from '../../components/app-builder/EnvironmentManager';

export default function AppEnvironmentsPage() {
  return (
    <>
      <Head>
        <title>Environment Manager | NexoApps Version 6.1</title>
        <meta name="description" content="Development, Staging, and Production environment manager." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <EnvironmentManager />
        </div>
      </main>
    </>
  );
}
