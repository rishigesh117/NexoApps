import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Navbar } from '../../components/Navbar';
import { AgentMetricsDashboard } from '../../components/agent-cloud/AgentMetricsDashboard';

export default function MetricsPage() {
  return (
    <>
      <Head>
        <title>Agent Telemetry & Metrics | NexoApps AI Cloud</title>
        <meta name="description" content="Agent telemetry, token usage benchmarks, and efficiency scoring." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-display font-bold">Agent Telemetry & Efficiency Scoring</h1>
            <p className="text-text-secondary mt-1">Monitor token consumption, task success rate, and swarm efficiency</p>
          </motion.div>

          <AgentMetricsDashboard />
        </div>
      </main>
    </>
  );
}
