import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Rocket, Sparkles } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { platformOsService } from '../../services/platformOsService';

export default function AdminVersionCenterPage() {
  const [versions, setVersions] = useState<any[]>([]);

  useEffect(() => {
    fetchVersions();
  }, []);

  const fetchVersions = async () => {
    try {
      const res = await platformOsService.getVersionHistory();
      if (res.success) setVersions(res.data);
    } catch (err) {
      console.error('Failed to load version history', err);
    }
  };

  return (
    <>
      <Head>
        <title>Version Center & Release Notes | NexoApps Admin</title>
        <meta name="description" content="Version 7.0 release and lifecycle center." />
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
                    <Rocket className="w-6 h-6 text-brand-cyan" />
                    NexoApps Version 7.0 Release & Lifecycle Center
                  </h1>
                  <p className="text-xs text-text-secondary">Release history, platform versioning, and changelogs</p>
                </div>
              </div>

              <div className="space-y-4">
                {versions.map((v) => (
                  <div key={v.id} className="glass-panel p-6 rounded-3xl border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold px-3 py-1 rounded-xl bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/30">
                        {v.versionTag}
                      </span>
                      <span className="text-xs text-text-muted">Deployed: {new Date(v.deployedAt).toLocaleDateString()}</span>
                    </div>
                    <h3 className="text-base font-bold text-white mt-1">{v.releaseName}</h3>
                    <p className="text-xs text-text-secondary">{v.changelog}</p>
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
