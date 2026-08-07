import React from 'react';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { TestManager } from '../../components/software-engineering/TestManager';

export default function SoftwareTestingPage() {
  return (
    <>
      <Head>
        <title>Automated Test Suite Engine | NexoApps</title>
        <meta name="description" content="Unit, integration, and security assertion testing suite." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <TestManager />
        </div>
      </main>
    </>
  );
}
