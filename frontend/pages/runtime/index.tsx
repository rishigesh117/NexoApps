import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Cpu, Server, Zap } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { RuntimeDashboard } from '../../components/runtime/RuntimeDashboard';
import { ServerlessConsole } from '../../components/runtime/ServerlessConsole';
import { ContainerManager } from '../../components/runtime/ContainerManager';
import { DeploymentPipelineV3 } from '../../components/runtime/DeploymentPipelineV3';
import { RuntimeMonitorGrid } from '../../components/runtime/RuntimeMonitorGrid';
import { AutoscalingConfigurator } from '../../components/runtime/AutoscalingConfigurator';
import { SnapshotManager } from '../../components/runtime/SnapshotManager';

export default function RuntimeHubPage() {
  return (
    <>
      <Head>
        <title>AI Runtime Engine & Serverless Execution | NexoApps Version 5.1</title>
        <meta name="description" content="AI Runtime Engine Hub. Execute AI-generated applications inside isolated serverless sandboxes." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/20 via-brand-cyan/20 to-brand-violet/20 border border-emerald-500/30">
              <Cpu className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-black tracking-wider uppercase text-white">AI Runtime Engine • Version 5.1</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-black tracking-tight">
              Serverless Execution <span className="bg-gradient-to-r from-emerald-400 via-brand-cyan to-brand-violet bg-clip-text text-transparent">& Sandboxing Platform</span>
            </h1>
            <p className="text-text-secondary text-base md:text-lg max-w-3xl mx-auto">
              Execute AI applications, APIs, workflows, and autonomous agents in isolated V8 isolates and containerized environments.
            </p>
          </motion.div>

          <RuntimeDashboard />
          <ServerlessConsole />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ContainerManager />
            <DeploymentPipelineV3 />
          </div>
          <RuntimeMonitorGrid />
          <AutoscalingConfigurator />
          <SnapshotManager />

        </div>
      </main>
    </>
  );
}
