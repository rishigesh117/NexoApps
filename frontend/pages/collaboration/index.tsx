import React from 'react';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { CollaborationDashboard } from '../../components/collaboration/CollaborationDashboard';

export default function CollaborationPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary flex flex-col">
      <Head>
        <title>AI Collaboration Platform & Digital Workplace | NexoApps</title>
        <meta name="description" content="NexoApps Version 8.4 AI Collaboration Platform, Digital Workplace, and Enterprise Knowledge Workspace." />
      </Head>
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <CollaborationDashboard />
      </main>
      <Footer />
    </div>
  );
}
