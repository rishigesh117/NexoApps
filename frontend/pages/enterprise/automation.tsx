import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Navbar } from '../../components/Navbar';
import { AutomationCenter } from '../../components/enterprise/AutomationCenter';

export default function AutomationPage() {
  return (
    <>
      <Head>
        <title>Automation Center | NexoApps AI Enterprise</title>
        <meta name="description" content="Business automation recipes and workflow templates." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-display font-bold">Business Process Automation Center</h1>
            <p className="text-text-secondary mt-1">Deploy pre-built automation templates for engineering, finance, and operations</p>
          </motion.div>

          <AutomationCenter />
        </div>
      </main>
    </>
  );
}
