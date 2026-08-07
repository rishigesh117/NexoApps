import React from 'react';
import Head from 'next/head';
import { BarChart3 } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { EngineeringAnalytics } from '../../components/software-engineering/EngineeringAnalytics';

export default function AdminEngineeringAnalyticsPage() {
  return (
    <>
      <Head>
        <title>Engineering Analytics Admin | NexoApps Admin</title>
        <meta name="description" content="SDLC velocity, code coverage, and technical debt telemetry." />
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
                    <BarChart3 className="w-6 h-6 text-brand-cyan" />
                    SDLC Velocity & Engineering Analytics Console
                  </h1>
                  <p className="text-xs text-text-secondary">Code coverage, technical debt hours, and productivity metrics</p>
                </div>
              </div>

              <EngineeringAnalytics />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
