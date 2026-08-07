import React from 'react';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { WorkflowDesigner } from '../../components/app-builder/WorkflowDesigner';

export default function AppWorkflowsPage() {
  return (
    <>
      <Head>
        <title>Visual Workflow Designer | NexoApps Version 6.1</title>
        <meta name="description" content="Visual node-based workflow orchestration in NexoApps Version 6.1." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <WorkflowDesigner />
        </div>
      </main>
    </>
  );
}
