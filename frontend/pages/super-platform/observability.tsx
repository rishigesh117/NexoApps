import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Navbar } from '../../components/Navbar';
import { ObservabilityDashboard } from '../../components/super-platform/ObservabilityDashboard';

export default function ObservabilityPage() {
  return (
    <>
      <Head>
        <title>Platform Observability | NexoApps Super Platform</title>
        <meta name="description" content="Distributed traces, service latencies, and log streams." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-display font-bold">Platform Telemetry & Observability</h1>
            <p className="text-text-secondary mt-1">Monitor end-to-end distributed traces, service execution latencies, and system events</p>
          </motion.div>

          <ObservabilityDashboard />
        </div>
      </main>
    </>
  );
}
