import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Navbar } from '../../components/Navbar';
import { PlatformHealthOverview } from '../../components/super-platform/PlatformHealthOverview';

export default function HealthPage() {
  return (
    <>
      <Head>
        <title>Platform Health | NexoApps Super Platform</title>
        <meta name="description" content="Overall platform health score and real-time system diagnostics." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-display font-bold">Platform Health & System Score</h1>
            <p className="text-text-secondary mt-1">Real-time health score, cluster node diagnostics, and system readiness</p>
          </motion.div>

          <PlatformHealthOverview />
        </div>
      </main>
    </>
  );
}
