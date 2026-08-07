import React from 'react';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { EnterpriseWorkflowCenter } from '../../components/enterprise/EnterpriseWorkflowCenter';

export default function EnterpriseWorkflowsPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary flex flex-col">
      <Head>
        <title>Enterprise Workflows | NexoApps</title>
      </Head>
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <EnterpriseWorkflowCenter />
      </main>
      <Footer />
    </div>
  );
}
