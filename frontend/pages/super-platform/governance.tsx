import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Navbar } from '../../components/Navbar';
import { GovernanceCenter } from '../../components/super-platform/GovernanceCenter';
import { ComplianceMonitor } from '../../components/super-platform/ComplianceMonitor';

export default function GovernancePage() {
  return (
    <>
      <Head>
        <title>AI Governance | NexoApps Super Platform</title>
        <meta name="description" content="Enterprise AI governance policies and compliance audit monitor." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-display font-bold">Enterprise AI Governance & Compliance</h1>
            <p className="text-text-secondary mt-1">Enforce security policies, privilege boundaries, and SOC2/ISO27001 compliance standards</p>
          </motion.div>

          <GovernanceCenter />
          <ComplianceMonitor />
        </div>
      </main>
    </>
  );
}
