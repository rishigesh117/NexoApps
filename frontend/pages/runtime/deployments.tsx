import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Navbar } from '../../components/Navbar';
import { DeploymentPipelineV3 } from '../../components/runtime/DeploymentPipelineV3';
import { AutoscalingConfigurator } from '../../components/runtime/AutoscalingConfigurator';

export default function RuntimeDeploymentsPage() {
  return (
    <>
      <Head>
        <title>Runtime Deployments | NexoApps AI Runtime</title>
        <meta name="description" content="Autonomous deployment pipelines and autoscaling policies." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-display font-bold">Autonomous Runtime Deployments</h1>
            <p className="text-text-secondary mt-1">Manage serverless deployments, build artifacts, and autoscaling thresholds</p>
          </motion.div>

          <DeploymentPipelineV3 />
          <AutoscalingConfigurator />
        </div>
      </main>
    </>
  );
}
