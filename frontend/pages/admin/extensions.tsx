import React from 'react';
import Head from 'next/head';
import { Globe } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { ExtensionManager } from '../../components/marketplace/ExtensionManager';

export default function AdminExtensionsPage() {
  return (
    <>
      <Head>
        <title>Extension Manager Admin | NexoApps Admin</title>
        <meta name="description" content="Extension packages and SDK runtime validation." />
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
                    <Globe className="w-6 h-6 text-brand-cyan" />
                    Extension Package Manager Console
                  </h1>
                  <p className="text-xs text-text-secondary">SDK package manifests & runtime dependency validation</p>
                </div>
              </div>

              <ExtensionManager />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
