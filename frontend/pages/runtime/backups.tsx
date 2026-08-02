import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Navbar } from '../../components/Navbar';
import { SnapshotManager } from '../../components/runtime/SnapshotManager';

export default function RuntimeBackupsPage() {
  return (
    <>
      <Head>
        <title>Runtime Snapshots & Backups | NexoApps AI Runtime</title>
        <meta name="description" content="Runtime state snapshots and cloud backup recovery points." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-display font-bold">Runtime Snapshots & Backup Recovery</h1>
            <p className="text-text-secondary mt-1">Manage memory state snapshots and environment cloud backup points</p>
          </motion.div>

          <SnapshotManager />
        </div>
      </main>
    </>
  );
}
