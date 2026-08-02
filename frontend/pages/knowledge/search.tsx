import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Navbar } from '../../components/Navbar';
import { SemanticSearchBar } from '../../components/knowledge/SemanticSearchBar';

export default function KnowledgeSearchPage() {
  return (
    <>
      <Head>
        <title>Semantic Vector Search | NexoApps Knowledge Cloud</title>
        <meta name="description" content="Dense vector similarity search and hybrid retrieval." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-display font-bold">Semantic Vector Search Engine</h1>
            <p className="text-text-secondary mt-1">Perform hybrid keyword-dense vector retrieval across knowledge vaults</p>
          </motion.div>

          <SemanticSearchBar />
        </div>
      </main>
    </>
  );
}
