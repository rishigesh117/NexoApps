import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Navbar } from '../../components/Navbar';
import { GlobalNetworkDashboard } from '../../components/super-platform/GlobalNetworkDashboard';
import { ClusterManager } from '../../components/super-platform/ClusterManager';

export default function ClustersPage() {
  return (
    <>
      <Head>
        <title>Global AI Clusters | NexoApps Super Platform</title>
        <meta name="description" content="Multi-region AI clusters and global network orchestration." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-display font-bold">Global AI Cluster Management</h1>
            <p className="text-text-secondary mt-1">Orchestrate multi-region cluster nodes, node counts, and cross-cloud latencies</p>
          </motion.div>

          <GlobalNetworkDashboard />
          <ClusterManager />
        </div>
      </main>
    </>
  );
}
