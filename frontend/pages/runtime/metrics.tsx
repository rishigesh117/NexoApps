import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Navbar } from '../../components/Navbar';
import { RuntimeMonitorGrid } from '../../components/runtime/RuntimeMonitorGrid';

export default function MetricsPage() {
  return (
    <>
      <Head>
        <title>Runtime Metrics | NexoApps AI Runtime</title>
        <meta name="description" content="CPU, RAM, and Network I/O telemetry for runtime instances." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-display font-bold">Runtime Resource Telemetry</h1>
            <p className="text-text-secondary mt-1">Real-time CPU percentage, RAM consumption, and network throughput</p>
          </motion.div>

          <RuntimeMonitorGrid />
        </div>
      </main>
    </>
  );
}
