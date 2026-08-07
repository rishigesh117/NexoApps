import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Activity, ShieldCheck } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { platformOsService } from '../../services/platformOsService';

export default function AdminSystemHealthPage() {
  const [health, setHealth] = useState<any[]>([]);

  useEffect(() => {
    fetchHealth();
  }, []);

  const fetchHealth = async () => {
    try {
      const res = await platformOsService.getModuleHealth();
      if (res.success) setHealth(res.data);
    } catch (err) {
      console.error('Failed to load system health', err);
    }
  };

  return (
    <>
      <Head>
        <title>System Health & Telemetry | NexoApps Admin</title>
        <meta name="description" content="Real-time AI OS health monitor and latency metrics." />
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
                    <Activity className="w-6 h-6 text-emerald-400" />
                    Real-Time AI OS Telemetry & Health Monitor
                  </h1>
                  <p className="text-xs text-text-secondary">Uptime, latency, and system health status</p>
                </div>
              </div>

              <div className="space-y-3">
                {health.map((h) => (
                  <div key={h.id} className="glass-panel p-5 rounded-2xl border border-white/10 flex items-center justify-between text-xs">
                    <div>
                      <h4 className="font-bold text-white uppercase">{h.moduleKey}</h4>
                      <p className="text-text-muted mt-0.5">Uptime: {h.uptimePct}% | Latency: {h.latencyMs}ms</p>
                    </div>
                    <span className="text-emerald-400 font-bold flex items-center gap-1 uppercase">
                      <ShieldCheck className="w-4 h-4" /> {h.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
