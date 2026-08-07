import React from 'react';
import Head from 'next/head';
import { Cpu, ShieldCheck, Activity, Layers, Sparkles } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { ProviderHealthGrid } from '../../components/ai-gateway/ProviderHealthGrid';
import { GatewayMonitor } from '../../components/ai-gateway/GatewayMonitor';

export default function AdminAIGatewayPage() {
  return (
    <>
      <Head>
        <title>AI Gateway Admin Console | NexoApps Admin</title>
        <meta name="description" content="Enterprise AI Gateway operational console, failover configuration, and model telemetry." />
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
                    Enterprise AI Gateway Operations Console
                  </h1>
                  <p className="text-xs text-text-secondary">Version 6.0 Universal Model Hub Administration</p>
                </div>
                <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan">
                  Platform v6.0
                </span>
              </div>

              <ProviderHealthGrid />
              <GatewayMonitor />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
