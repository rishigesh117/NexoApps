import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Navbar } from '../../components/Navbar';
import { ReleaseCenter } from '../../components/super-platform/ReleaseCenter';

export default function ReleasesPage() {
  return (
    <>
      <Head>
        <title>Release Center | NexoApps Super Platform</title>
        <meta name="description" content="Platform version history from v5.0 to v5.4.0 official release." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-display font-bold">Platform Release & Version History</h1>
            <p className="text-text-secondary mt-1">Official Version 5.4.0 release notes, LTS milestones, and phase history</p>
          </motion.div>

          <ReleaseCenter />
        </div>
      </main>
    </>
  );
}
