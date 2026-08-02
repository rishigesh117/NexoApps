import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Navbar } from '../../components/Navbar';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { WorkflowDesigner } from '../../components/cloud/WorkflowDesigner';
import { DeploymentPipeline } from '../../components/cloud/DeploymentPipeline';
import { QueueMonitor } from '../../components/cloud/QueueMonitor';

export default function AdminCloudPage() {
  return (
    <>
      <Head>
        <title>Admin Enterprise Cloud Console | NexoApps Admin</title>
        <meta name="description" content="Enterprise Cloud administration console for workflow operations, deployments, and queues." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <AdminSidebar />
            <div className="flex-1 min-w-0 space-y-8">
              <h1 className="text-2xl font-display font-bold">Enterprise Cloud Console</h1>
              <WorkflowDesigner />
              <DeploymentPipeline />
              <QueueMonitor />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
