import React from 'react';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { RuntimeDashboard } from '../../components/runtime/RuntimeDashboard';
import { ContainerManager } from '../../components/runtime/ContainerManager';
import { RuntimeMonitorGrid } from '../../components/runtime/RuntimeMonitorGrid';

export default function AdminRuntimeV2Page() {
  return (
    <>
      <Head>
        <title>Admin AI Runtime Console v2 | NexoApps Admin</title>
        <meta name="description" content="Admin console for managing AI Runtime environments, containers, and metrics." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <AdminSidebar />
            <div className="flex-1 min-w-0 space-y-8">
              <h1 className="text-2xl font-display font-bold">AI Runtime Control Console v2</h1>
              <RuntimeDashboard />
              <ContainerManager />
              <RuntimeMonitorGrid />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
