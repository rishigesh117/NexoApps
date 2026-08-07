import React from 'react';
import Head from 'next/head';
import { Cpu } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { AdminSidebar } from '../../components/admin/AdminSidebar';

export default function AdminSoftwareEngineeringPage() {
  return (
    <>
      <Head>
        <title>Software Engineering Console | NexoApps Admin</title>
        <meta name="description" content="Autonomous Software Engineering Platform console." />
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
                    <Cpu className="w-6 h-6 text-brand-cyan" />
                    Autonomous AI Software Engineering Console
                  </h1>
                  <p className="text-xs text-text-secondary">Version 6.3 Platform Governance & SDLC Automation</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-panel p-6 rounded-3xl border border-white/10">
                  <p className="text-xs text-text-muted font-bold uppercase">Active Projects</p>
                  <h3 className="text-3xl font-extrabold text-white mt-1">12</h3>
                </div>
                <div className="glass-panel p-6 rounded-3xl border border-white/10">
                  <p className="text-xs text-text-muted font-bold uppercase">Code Generations</p>
                  <h3 className="text-3xl font-extrabold text-brand-cyan mt-1">1,480</h3>
                </div>
                <div className="glass-panel p-6 rounded-3xl border border-white/10">
                  <p className="text-xs text-text-muted font-bold uppercase">Average Quality Score</p>
                  <h3 className="text-3xl font-extrabold text-emerald-400 mt-1">96.5%</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
