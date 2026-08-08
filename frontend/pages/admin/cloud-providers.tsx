import React from 'react';
import Head from 'next/head';
import { Navbar } from '../../components/Navbar';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { CloudProviderManager } from '../../components/cloud-control/CloudProviderManager';

export default function AdminCloudProvidersPage() {
  return (
    <>
      <Head>
        <title>Cloud Providers | NexoApps Admin</title>
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <AdminSidebar />
            <div className="flex-1 min-w-0 space-y-8">
              <h1 className="text-2xl font-display font-bold">Admin Cloud Provider Management</h1>
              <CloudProviderManager />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
