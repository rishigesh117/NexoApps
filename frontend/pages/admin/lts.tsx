import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { ShieldCheck, Activity, Terminal, CheckCircle2 } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { LTSStatusBadge } from '../../components/lts/LTSStatusBadge';
import { SecurityHardeningCard } from '../../components/lts/SecurityHardeningCard';
import { PerformanceMonitorCard } from '../../components/lts/PerformanceMonitorCard';

export default function AdminLTSPage() {
  const events = [
    { eventType: 'SYSTEM_BOOT', details: 'NexoApps v4.0.0 LTS System Boot Completed Successfully', time: '1 hr ago' },
    { eventType: 'SECURITY_SCAN', details: 'All 28 OWASP Security Verification Checks Passed', time: '30 min ago' },
    { eventType: 'DATABASE_OPTIMIZATION', details: 'Database query planner indexes and vacuum completed', time: '15 min ago' },
  ];

  return (
    <>
      <Head>
        <title>Admin LTS Center & Health Diagnostics | NexoApps Admin</title>
        <meta name="description" content="NexoApps Version 4.0 LTS Admin Health Diagnostic Center and Security Audit Log Console." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <AdminSidebar />
            <div className="flex-1 min-w-0 space-y-8">
              
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-display font-bold">LTS Health & Security Center</h1>
                  <p className="text-xs text-text-secondary">Version 4.0 LTS system verification and diagnostic telemetry</p>
                </div>
                <LTSStatusBadge version="4.0.0-LTS" isLTS={true} />
              </div>

              <SecurityHardeningCard />
              <PerformanceMonitorCard />

              {/* Security Event Log */}
              <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-brand-cyan" /> Security & LTS Operations Log
                </h3>
                <div className="space-y-2">
                  {events.map((e, index) => (
                    <div key={index} className="p-3 rounded-xl bg-surface-100 border border-white/10 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="font-mono font-bold text-white">{e.eventType}</span>
                        <span className="text-text-secondary">{e.details}</span>
                      </div>
                      <span className="text-text-muted whitespace-nowrap">{e.time}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </>
  );
}
