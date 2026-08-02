import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Navbar } from '../../components/Navbar';
import { OptimizationPanel } from '../../components/super-platform/OptimizationPanel';
import { ResourceAllocator } from '../../components/super-platform/ResourceAllocator';

export default function OptimizationPage() {
  return (
    <>
      <Head>
        <title>AI Optimization | NexoApps Super Platform</title>
        <meta name="description" content="System optimization profiles and compute resource allocation." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-display font-bold">Performance Optimization & Tuning</h1>
            <p className="text-text-secondary mt-1">Select latency optimization profiles and inspect hardware compute allocations</p>
          </motion.div>

          <OptimizationPanel />
          <ResourceAllocator />
        </div>
      </main>
    </>
  );
}
