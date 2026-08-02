import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Bot, Sparkles, Layers, Activity } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { WorkspaceOverview } from '../../components/agent-cloud/WorkspaceOverview';
import { AgentManager } from '../../components/agent-cloud/AgentManager';
import { AgentExecutionConsole } from '../../components/agent-cloud/AgentExecutionConsole';
import { AgentTimeline } from '../../components/agent-cloud/AgentTimeline';
import { AgentMemoryViewer } from '../../components/agent-cloud/AgentMemoryViewer';
import { CapabilityManager } from '../../components/agent-cloud/CapabilityManager';
import { AgentMetricsDashboard } from '../../components/agent-cloud/AgentMetricsDashboard';

export default function AgentCloudHubPage() {
  return (
    <>
      <Head>
        <title>AI Operating Cloud | NexoApps Version 5.0</title>
        <meta name="description" content="AI Operating Cloud hub. Orchestrate autonomous multi-agent workspaces, shared memory, and tool execution." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-brand-cyan/20 to-brand-violet/20 border border-brand-cyan/30">
              <Bot className="w-4 h-4 text-brand-cyan" />
              <span className="text-xs font-black tracking-wider uppercase text-white">AI Operating Cloud • Version 5.0</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-black tracking-tight">
              Multi-Agent <span className="bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet bg-clip-text text-transparent">Orchestration Cloud</span>
            </h1>
            <p className="text-text-secondary text-base md:text-lg max-w-3xl mx-auto">
              Create, manage, and orchestrate intelligent AI agents that collaborate across projects, workspaces, persistent shared memory, and cloud resources.
            </p>
          </motion.div>

          <WorkspaceOverview />
          <AgentManager />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AgentExecutionConsole />
            <AgentTimeline />
          </div>
          <AgentMemoryViewer />
          <CapabilityManager />
          <AgentMetricsDashboard />

        </div>
      </main>
    </>
  );
}
