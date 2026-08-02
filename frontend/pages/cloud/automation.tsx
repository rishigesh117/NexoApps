import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Navbar } from '../../components/Navbar';
import { AutomationRuleBuilder } from '../../components/cloud/AutomationRuleBuilder';
import { QueueMonitor } from '../../components/cloud/QueueMonitor';
import { WorkerStatusGrid } from '../../components/cloud/WorkerStatusGrid';

export default function CloudAutomationPage() {
  return (
    <>
      <Head>
        <title>Workflow Automation & Queues | NexoApps AI Cloud</title>
        <meta name="description" content="Event-driven automation rules, distributed message queues, and worker pool management." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-display font-bold">Event Automation & Distributed Processing</h1>
            <p className="text-text-secondary mt-1">Event-driven rules, message queues, and worker resource status</p>
          </motion.div>

          <AutomationRuleBuilder />
          <QueueMonitor />
          <WorkerStatusGrid />
        </div>
      </main>
    </>
  );
}
