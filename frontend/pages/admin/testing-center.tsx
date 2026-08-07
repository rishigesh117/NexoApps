import React from 'react';
import Head from 'next/head';
import { Play } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { TestManager } from '../../components/software-engineering/TestManager';

export default function AdminTestingCenterPage() {
  return (
    <>
      <Head>
        <title>Testing Center Admin | NexoApps Admin</title>
        <meta name="description" content="Global test suite execution and quality governance." />
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
                    <Play className="w-6 h-6 text-emerald-400" />
                    Global Testing Suite & Quality Governance
                  </h1>
                  <p className="text-xs text-text-secondary">Automated assertions across all active microservices</p>
                </div>
              </div>

              <TestManager />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
