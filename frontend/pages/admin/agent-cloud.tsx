import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Navbar } from '../../components/Navbar';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { WorkspaceOverview } from '../../components/agent-cloud/WorkspaceOverview';
import { AgentManager } from '../../components/agent-cloud/AgentManager';
import { AgentMetricsDashboard } from '../../components/agent-cloud/AgentMetricsDashboard';

export default function AdminAgentCloudPage() {
  return (
    <>
      <Head>
        <title>Admin Agent Cloud Console | NexoApps Admin</title>
        <meta name="description" content="Admin console for managing AI Operating Cloud workspaces, agents, and metrics." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <AdminSidebar />
            <div className="flex-1 min-w-0 space-y-8">
              <h1 className="text-2xl font-display font-bold">AI Operating Cloud Console</h1>
              <WorkspaceOverview />
              <AgentManager />
              <AgentMetricsDashboard />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
