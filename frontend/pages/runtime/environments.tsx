import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Navbar } from '../../components/Navbar';
import { RuntimeDashboard } from '../../components/runtime/RuntimeDashboard';

export default function EnvironmentsPage() {
  return (
    <>
      <Head>
        <title>Runtime Environments | NexoApps AI Runtime</title>
        <meta name="description" content="Manage isolated sandboxed runtime engines and V8 isolates." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-display font-bold">Sandboxed Runtime Environments</h1>
            <p className="text-text-secondary mt-1">Configure isolation levels, memory bounds, and execution pools</p>
          </motion.div>

          <RuntimeDashboard />
        </div>
      </main>
    </>
  );
}
