import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Navbar } from '../../components/Navbar';
import { BackupManager } from '../../components/cloud/BackupManager';

export default function CloudBackupsPage() {
  return (
    <>
      <Head>
        <title>System Backups | NexoApps AI Cloud</title>
        <meta name="description" content="Automated database backups, full snapshots, and backup scheduling." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-display font-bold">System Backup Center</h1>
            <p className="text-text-secondary mt-1">Automated database snapshots, incremental backups, and retention policies</p>
          </motion.div>

          <BackupManager />
        </div>
      </main>
    </>
  );
}
