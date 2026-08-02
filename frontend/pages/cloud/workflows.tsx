import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Navbar } from '../../components/Navbar';
import { WorkflowDesigner } from '../../components/cloud/WorkflowDesigner';

export default function CloudWorkflowsPage() {
  return (
    <>
      <Head>
        <title>Visual Workflow Designer | NexoApps AI Cloud</title>
        <meta name="description" content="Visual drag-and-drop workflow designer, AI workflow execution, and versioning." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-display font-bold">AI Workflow Orchestration</h1>
            <p className="text-text-secondary mt-1">Design, execute, and automate multi-step AI workflows</p>
          </motion.div>

          <WorkflowDesigner />
        </div>
      </main>
    </>
  );
}
