import React from 'react';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { NetworkingDashboard } from '../../components/networking/NetworkingDashboard';

export default function NetworkingDashboardPage() {
  return (
    <>
      <Head>
        <title>Networking Dashboard | NexoApps</title>
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h1 className="text-3xl font-display font-bold text-white tracking-tight">Networking Control Center</h1>
          <NetworkingDashboard />
        </div>
      </main>
      <Footer />
    </>
  );
}
