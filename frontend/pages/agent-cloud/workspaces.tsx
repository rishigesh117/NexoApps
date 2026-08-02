import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Navbar } from '../../components/Navbar';
import { WorkspaceOverview } from '../../components/agent-cloud/WorkspaceOverview';

export default function AgentWorkspacesPage() {
  return (
    <>
      <Head>
        <title>Multi-Agent Workspaces | NexoApps AI Cloud</title>
        <meta name="description" content="Manage multi-agent swarm workspaces and context environments." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-display font-bold">Multi-Agent Swarm Workspaces</h1>
            <p className="text-text-secondary mt-1">Orchestrate collaborative agent swarms across production and staging environments</p>
          </motion.div>

          <WorkspaceOverview />
        </div>
      </main>
    </>
  );
}
