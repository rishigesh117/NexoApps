import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { ToggleLeft, CheckCircle2 } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { platformOsService } from '../../services/platformOsService';

export default function AdminFeatureFlagsPage() {
  const [flags, setFlags] = useState<any[]>([]);

  useEffect(() => {
    fetchFlags();
  }, []);

  const fetchFlags = async () => {
    try {
      const res = await platformOsService.listFeatureFlags();
      if (res.success) setFlags(res.data);
    } catch (err) {
      console.error('Failed to load feature flags', err);
    }
  };

  return (
    <>
      <Head>
        <title>Feature Flags & Rollouts | NexoApps Admin</title>
        <meta name="description" content="Enterprise feature flag and rollout manager." />
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
                    <ToggleLeft className="w-6 h-6 text-brand-cyan" />
                    Enterprise Feature Flag & Canary Rollout Manager
                  </h1>
                  <p className="text-xs text-text-secondary">Control system capabilities and experimental feature rollouts</p>
                </div>
              </div>

              <div className="space-y-3">
                {flags.map((f) => (
                  <div key={f.id} className="glass-panel p-5 rounded-2xl border border-white/10 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-mono font-bold text-brand-cyan">{f.flagKey}</span>
                      <p className="text-text-muted mt-0.5">{f.description}</p>
                    </div>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Enabled ({f.rolloutPercentage}%)
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
