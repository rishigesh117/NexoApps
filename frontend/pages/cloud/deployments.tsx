import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Navbar } from '../../components/Navbar';
import { DeploymentPipeline } from '../../components/cloud/DeploymentPipeline';

export default function CloudDeploymentsPage() {
  return (
    <>
      <Head>
        <title>Cloud Deployments | NexoApps AI Cloud</title>
        <meta name="description" content="Cloud deployment orchestration, Kubernetes rolling updates, and deployment logs." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-display font-bold">Cloud Deployment Pipelines</h1>
            <p className="text-text-secondary mt-1">Orchestrate container builds, Kubernetes deployments, and canary releases</p>
          </motion.div>

          <DeploymentPipeline />
        </div>
      </main>
    </>
  );
}
