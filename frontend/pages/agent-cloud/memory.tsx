import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Navbar } from '../../components/Navbar';
import { AgentMemoryViewer } from '../../components/agent-cloud/AgentMemoryViewer';

export default function MemoryPage() {
  return (
    <>
      <Head>
        <title>Persistent Agent Memory | NexoApps AI Cloud</title>
        <meta name="description" content="Persistent shared context memory and workspace knowledge graph." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-display font-bold">Persistent Shared Context Memory</h1>
            <p className="text-text-secondary mt-1">Shared workspace knowledge graph, key-value context, and vector embeddings</p>
          </motion.div>

          <AgentMemoryViewer />
        </div>
      </main>
    </>
  );
}
