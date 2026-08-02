import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Navbar } from '../../components/Navbar';
import { RestoreWizard } from '../../components/cloud/RestoreWizard';

export default function CloudRestorePage() {
  return (
    <>
      <Head>
        <title>Restore Wizard | NexoApps AI Cloud</title>
        <meta name="description" content="Disaster recovery restore wizard for platform databases and state." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-display font-bold">Disaster Recovery Restore Wizard</h1>
            <p className="text-text-secondary mt-1">Restore platform state from verified backup snapshots</p>
          </motion.div>

          <RestoreWizard />
        </div>
      </main>
    </>
  );
}
