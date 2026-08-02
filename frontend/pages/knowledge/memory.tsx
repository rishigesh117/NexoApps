import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Navbar } from '../../components/Navbar';
import { ConversationMemoryPanel } from '../../components/knowledge/ConversationMemoryPanel';

export default function KnowledgeMemoryPage() {
  return (
    <>
      <Head>
        <title>Conversational Memory | NexoApps Knowledge Cloud</title>
        <meta name="description" content="RAG session memory graph and context state retention." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-display font-bold">Intelligent Conversational Memory</h1>
            <p className="text-text-secondary mt-1">Inspect RAG session memory keys, importance scores, and context snapshots</p>
          </motion.div>

          <ConversationMemoryPanel />
        </div>
      </main>
    </>
  );
}
