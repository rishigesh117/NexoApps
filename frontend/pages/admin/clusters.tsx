import React from 'react';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { CloudClusterView } from '../../components/cloud/CloudClusterView';

export default function AdminClustersPage() {
  return (
    <>
      <Head>
        <title>Admin Cloud Clusters | NexoApps Admin</title>
        <meta name="description" content="Manage Kubernetes cluster node pools, regional clusters, and infrastructure status." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <AdminSidebar />
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-display font-bold mb-6">Cloud Clusters & Infrastructure</h1>
              <CloudClusterView />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
