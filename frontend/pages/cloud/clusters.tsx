import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Navbar } from '../../components/Navbar';
import { CloudClusterView } from '../../components/cloud/CloudClusterView';

export default function CloudClustersPage() {
  return (
    <>
      <Head>
        <title>Cloud Clusters | NexoApps AI Cloud</title>
        <meta name="description" content="Kubernetes cluster management, node pools, and cloud infrastructure telemetry." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-display font-bold">Cloud Infrastructure Clusters</h1>
            <p className="text-text-secondary mt-1">Monitor multi-cloud Kubernetes clusters and compute nodes</p>
          </motion.div>

          <CloudClusterView />
        </div>
      </main>
    </>
  );
}
