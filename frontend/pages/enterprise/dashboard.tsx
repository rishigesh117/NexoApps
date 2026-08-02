import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Navbar } from '../../components/Navbar';
import { OrganizationDashboard } from '../../components/enterprise/OrganizationDashboard';

export default function EnterpriseDashboardPage() {
  return (
    <>
      <Head>
        <title>Organization Dashboard | NexoApps AI Enterprise</title>
        <meta name="description" content="Executive organization dashboard and operational health." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-display font-bold">Executive Organization Dashboard</h1>
            <p className="text-text-secondary mt-1">Monitor digital workforce capacity, process throughput, and operational metrics</p>
          </motion.div>

          <OrganizationDashboard />
        </div>
      </main>
    </>
  );
}
