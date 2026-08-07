import React from 'react';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { DatabaseHealthDashboard } from '../../components/database-platform/DatabaseHealthDashboard';

export default function DatabaseHealthPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary flex flex-col">
      <Head>
        <title>Database Health | NexoApps</title>
      </Head>
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <DatabaseHealthDashboard />
      </main>
      <Footer />
    </div>
  );
}
