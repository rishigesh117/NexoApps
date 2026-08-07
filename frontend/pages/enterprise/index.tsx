import React from 'react';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { EnterpriseDashboard } from '../../components/enterprise/EnterpriseDashboard';

export default function EnterpriseIndexPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary flex flex-col">
      <Head>
        <title>NexoApps AI Enterprise Universe | Version 9.0</title>
        <meta name="description" content="Official Version 9.0 Production Release of the NexoApps AI Enterprise Universe." />
      </Head>
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <EnterpriseDashboard />
      </main>
      <Footer />
    </div>
  );
}
