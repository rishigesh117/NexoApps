import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Navbar } from '../../components/Navbar';
import { ApprovalQueue } from '../../components/enterprise/ApprovalQueue';

export default function ApprovalsPage() {
  return (
    <>
      <Head>
        <title>Approval Center | NexoApps AI Enterprise</title>
        <meta name="description" content="Multi-tier approval queue and request sign-offs." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-display font-bold">Enterprise Approval Center</h1>
            <p className="text-text-secondary mt-1">Review pending sign-off requests, budget approvals, and compliance validations</p>
          </motion.div>

          <ApprovalQueue />
        </div>
      </main>
    </>
  );
}
