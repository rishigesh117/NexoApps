import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Database, Search, Bot, FileText } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { KnowledgeExplorer } from '../../components/knowledge/KnowledgeExplorer';
import { SemanticSearchBar } from '../../components/knowledge/SemanticSearchBar';
import { KnowledgeChat } from '../../components/knowledge/KnowledgeChat';
import { ConnectorManager } from '../../components/knowledge/ConnectorManager';
import { KnowledgeStatistics } from '../../components/knowledge/KnowledgeStatistics';

export default function KnowledgeCloudHubPage() {
  return (
    <>
      <Head>
        <title>Enterprise AI Knowledge Cloud | NexoApps Version 5.2</title>
        <meta name="description" content="Enterprise RAG Platform & Intelligent Knowledge Cloud Hub." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-brand-cyan/20 via-blue-500/20 to-brand-violet/20 border border-brand-cyan/30">
              <Database className="w-4 h-4 text-brand-cyan" />
              <span className="text-xs font-black tracking-wider uppercase text-white">Knowledge Cloud • Version 5.2</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-black tracking-tight">
              Enterprise RAG & <span className="bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet bg-clip-text text-transparent">Knowledge Engine</span>
            </h1>
            <p className="text-text-secondary text-base md:text-lg max-w-3xl mx-auto">
              HNSW vector indexing, hybrid semantic search, context-synthesized RAG Q&A, and multi-source connectors.
            </p>
          </motion.div>

          <KnowledgeExplorer />
          <SemanticSearchBar />
          <KnowledgeChat />
          <ConnectorManager />
          <KnowledgeStatistics />

        </div>
      </main>
    </>
  );
}
