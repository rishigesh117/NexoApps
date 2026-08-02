import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Navbar } from '../../components/Navbar';
import { KnowledgeChat } from '../../components/knowledge/KnowledgeChat';

export default function KnowledgeChatPage() {
  return (
    <>
      <Head>
        <title>Enterprise RAG Chat | NexoApps Knowledge Cloud</title>
        <meta name="description" content="Conversational Q&A with live vector document citations." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-display font-bold">Enterprise RAG Assistant</h1>
            <p className="text-text-secondary mt-1">Context-aware Q&A backed by live vector document citations</p>
          </motion.div>

          <KnowledgeChat />
        </div>
      </main>
    </>
  );
}
