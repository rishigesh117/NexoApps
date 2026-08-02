import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Navbar } from '../../components/Navbar';
import { EnterpriseMetricsPanel } from '../../components/enterprise/EnterpriseMetricsPanel';

export default function EnterpriseAnalyticsPage() {
  return (
    <>
      <Head>
        <title>Enterprise Analytics | NexoApps AI Enterprise</title>
        <meta name="description" content="Digital workforce productivity and ROI analytics." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-display font-bold">Enterprise Productivity & ROI Analytics</h1>
            <p className="text-text-secondary mt-1">Track digital workforce utilization scores and AI decision accuracy benchmarks</p>
          </motion.div>

          <EnterpriseMetricsPanel />
        </div>
      </main>
    </>
  );
}
