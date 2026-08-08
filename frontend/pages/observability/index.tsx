import React from 'react';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { ObservabilityDashboard } from '../../components/observability/ObservabilityDashboard';

export default function ObservabilityPage() {
  return (
    <>
      <Head>
        <title>Observability & Intelligent Operations Platform | NexoApps</title>
        <meta name="description" content="Centralized metrics, distributed tracing, log analytics, incident response, and AI intelligent operations for NexoApps." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <h1 className="text-3xl font-display font-bold text-white tracking-tight">
                Observability & Intelligent Operations Center
              </h1>
              <p className="text-sm text-text-muted mt-1">
                Version 9.3 Unified Telemetry, Centralized Logging, Distributed Tracing & Predictive AI Operations
              </p>
            </div>
          </div>
          <ObservabilityDashboard />
        </div>
      </main>
      <Footer />
    </>
  );
}
