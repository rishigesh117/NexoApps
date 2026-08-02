import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Navbar } from '../../components/Navbar';
import { AgentManager } from '../../components/agent-cloud/AgentManager';

export default function AgentsPage() {
  return (
    <>
      <Head>
        <title>Workspace Agents | NexoApps AI Cloud</title>
        <meta name="description" content="Provision, configure, and monitor workspace AI agents." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-display font-bold">Workspace Agent Roster</h1>
            <p className="text-text-secondary mt-1">Manage AI agent roles, models, temperature settings, and status</p>
          </motion.div>

          <AgentManager />
        </div>
      </main>
    </>
  );
}
