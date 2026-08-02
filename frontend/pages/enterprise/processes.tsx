import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Navbar } from '../../components/Navbar';
import { BusinessProcessDesigner } from '../../components/enterprise/BusinessProcessDesigner';

export default function ProcessesPage() {
  return (
    <>
      <Head>
        <title>Business Processes | NexoApps AI Enterprise</title>
        <meta name="description" content="Business process automation definitions and triggers." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-display font-bold">Business Process Automation</h1>
            <p className="text-text-secondary mt-1">Design, orchestrate, and trigger automated enterprise business processes</p>
          </motion.div>

          <BusinessProcessDesigner />
        </div>
      </main>
    </>
  );
}
