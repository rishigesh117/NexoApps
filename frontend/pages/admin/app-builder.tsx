import React from 'react';
import Head from 'next/head';
import { Layout, Activity, Cpu } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { AdminSidebar } from '../../components/admin/AdminSidebar';

export default function AdminAppBuilderPage() {
  return (
    <>
      <Head>
        <title>Application Builder Console | NexoApps Admin</title>
        <meta name="description" content="AI Application Builder platform administration console." />
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
                    <Layout className="w-6 h-6 text-brand-cyan" />
                    AI Application Builder Platform Console
                  </h1>
                  <p className="text-xs text-text-secondary">Version 6.1 Low-Code Platform Telemetry & Management</p>
                </div>
                <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan">
                  Platform v6.1
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-panel p-6 rounded-3xl border border-white/10">
                  <p className="text-xs text-text-muted font-bold uppercase">Total Low-Code Apps</p>
                  <h3 className="text-3xl font-extrabold text-white mt-1">14</h3>
                </div>
                <div className="glass-panel p-6 rounded-3xl border border-white/10">
                  <p className="text-xs text-text-muted font-bold uppercase">Published Applications</p>
                  <h3 className="text-3xl font-extrabold text-emerald-400 mt-1">9</h3>
                </div>
                <div className="glass-panel p-6 rounded-3xl border border-white/10">
                  <p className="text-xs text-text-muted font-bold uppercase">Active Build Pipelines</p>
                  <h3 className="text-3xl font-extrabold text-brand-cyan mt-1">42</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
