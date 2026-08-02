import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Navbar } from '../../components/Navbar';
import { KnowledgeStatistics } from '../../components/knowledge/KnowledgeStatistics';

export default function KnowledgeStatisticsPage() {
  return (
    <>
      <Head>
        <title>Knowledge Analytics | NexoApps Knowledge Cloud</title>
        <meta name="description" content="Knowledge base statistics and search latency telemetry." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-display font-bold">Knowledge Cloud Analytics</h1>
            <p className="text-text-secondary mt-1">Monitor query throughput, vector search latencies, and chunk counts</p>
          </motion.div>

          <KnowledgeStatistics />
        </div>
      </main>
    </>
  );
}
