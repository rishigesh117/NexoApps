import React from 'react';
import Head from 'next/head';
import { Boxes } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { PluginManager } from '../../components/marketplace/PluginManager';

export default function AdminPluginsPage() {
  return (
    <>
      <Head>
        <title>Plugin Registry Admin | NexoApps Admin</title>
        <meta name="description" content="Global plugin registry and security approvals." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <AdminSidebar />
            <div className="flex-1 min-w-0 space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-display font-bold text-white flex items-center gap-2">
                    <Boxes className="w-6 h-6 text-brand-cyan" />
                    Global Plugin Registry Administration
                  </h1>
                  <p className="text-xs text-text-secondary">Security permissions & entrypoint file validation</p>
                </div>
              </div>

              <PluginManager />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
