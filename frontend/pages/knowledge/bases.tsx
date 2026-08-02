import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Navbar } from '../../components/Navbar';
import { KnowledgeExplorer } from '../../components/knowledge/KnowledgeExplorer';

export default function KnowledgeBasesPage() {
  return (
    <>
      <Head>
        <title>Knowledge Bases | NexoApps Knowledge Cloud</title>
        <meta name="description" content="Enterprise RAG knowledge vaults and vector collections." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-display font-bold">Knowledge Vaults & Vector Bases</h1>
            <p className="text-text-secondary mt-1">Manage partitioned knowledge bases, embedding models, and vector dimensions</p>
          </motion.div>

          <KnowledgeExplorer />
        </div>
      </main>
    </>
  );
}
