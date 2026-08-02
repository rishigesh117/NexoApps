import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Navbar } from '../../components/Navbar';
import { ReasoningConsole } from '../../components/super-platform/ReasoningConsole';

export default function ReasoningPage() {
  return (
    <>
      <Head>
        <title>Reasoning Engine | NexoApps Super Platform</title>
        <meta name="description" content="Multi-step reasoning workflows and Tree of Thought strategy." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-display font-bold">Intelligent Reasoning Engine</h1>
            <p className="text-text-secondary mt-1">Execute multi-step problem solving with confidence scoring and Tree of Thought synthesis</p>
          </motion.div>

          <ReasoningConsole />
        </div>
      </main>
    </>
  );
}
