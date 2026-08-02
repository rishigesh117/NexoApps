import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Sparkles, Globe, Brain, ShieldCheck, Activity } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { GlobalNetworkDashboard } from '../../components/super-platform/GlobalNetworkDashboard';
import { ClusterManager } from '../../components/super-platform/ClusterManager';
import { ReasoningConsole } from '../../components/super-platform/ReasoningConsole';
import { GovernanceCenter } from '../../components/super-platform/GovernanceCenter';
import { ObservabilityDashboard } from '../../components/super-platform/ObservabilityDashboard';
import { ResourceAllocator } from '../../components/super-platform/ResourceAllocator';
import { OptimizationPanel } from '../../components/super-platform/OptimizationPanel';
import { ComplianceMonitor } from '../../components/super-platform/ComplianceMonitor';
import { PlatformHealthOverview } from '../../components/super-platform/PlatformHealthOverview';
import { ReleaseCenter } from '../../components/super-platform/ReleaseCenter';

export default function SuperPlatformHubPage() {
  return (
    <>
      <Head>
        <title>Autonomous AI Super Platform | NexoApps Version 5.4</title>
        <meta name="description" content="Unified Autonomous AI Super Platform Hub. Global AI network, reasoning engine, governance, and observability." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/20 via-brand-cyan/20 to-brand-violet/20 border border-emerald-500/30">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-black tracking-wider uppercase text-white">AI Super Platform • Version 5.4 Official Release</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-black tracking-tight">
              Unified Autonomous <span className="bg-gradient-to-r from-emerald-400 via-brand-cyan to-brand-violet bg-clip-text text-transparent">AI Super Platform</span>
            </h1>
            <p className="text-text-secondary text-base md:text-lg max-w-3xl mx-auto">
              Global AI network orchestration, multi-step reasoning, enterprise governance, observability, resource allocation, and production optimization.
            </p>
          </motion.div>

          <PlatformHealthOverview />
          <GlobalNetworkDashboard />
          <ReasoningConsole />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ClusterManager />
            <GovernanceCenter />
          </div>
          <ObservabilityDashboard />
          <ResourceAllocator />
          <OptimizationPanel />
          <ComplianceMonitor />
          <ReleaseCenter />

        </div>
      </main>
    </>
  );
}
