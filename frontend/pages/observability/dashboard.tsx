import React from 'react';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { ObservabilityDashboard } from '../../components/observability/ObservabilityDashboard';

export default function ObservabilityDashboardPage() {
  return (
    <>
      <Head>
        <title>Observability Dashboard | NexoApps</title>
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h1 className="text-3xl font-display font-bold text-white tracking-tight">Executive Telemetry Dashboard</h1>
          <ObservabilityDashboard />
        </div>
      </main>
      <Footer />
    </>
  );
}
