import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Navbar } from '../../components/Navbar';
import { ConnectorManager } from '../../components/knowledge/ConnectorManager';

export default function ConnectorsPage() {
  return (
    <>
      <Head>
        <title>Knowledge Connectors | NexoApps Knowledge Cloud</title>
        <meta name="description" content="Multi-source data connectors for Confluence, Notion, GitHub, and Drive." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-display font-bold">Multi-Source Sync Connectors</h1>
            <p className="text-text-secondary mt-1">Sync document repositories from Confluence, Notion, GitHub, and Google Drive</p>
          </motion.div>

          <ConnectorManager />
        </div>
      </main>
    </>
  );
}
