import React, { useState, useEffect } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CloudSyncButton } from '../components/cloud/CloudSyncButton';
import { SyncStatusCard } from '../components/cloud/SyncStatusCard';
import { DeviceList } from '../components/cloud/DeviceList';
import { fetchApi } from '../services/apiClient';
import { UserDevice } from '../types';
import { Cloud, Smartphone, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function CloudDashboardPage() {
  const [devices, setDevices] = useState<UserDevice[]>([]);
  const [status, setStatus] = useState<any>(null);

  const fetchData = async () => {
    try {
      const [devRes, statusRes] = await Promise.all([
        fetchApi<{ success: boolean; data: UserDevice[] }>('/devices'),
        fetchApi<{ success: boolean; data: any }>('/sync/status'),
      ]);
      setDevices(devRes.data || []);
      setStatus(statusRes.data);
    } catch {
      // Fallbacks
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <SEOHead
        title="Cloud Sync Dashboard & User Data Sync | NexoApps"
        description="Synchronize account preferences, custom collections, and application data seamlessly across all your devices."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
          {/* Header */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xl">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
                <Cloud className="w-6 h-6 text-brand-cyan" /> Cloud Synchronization Dashboard
              </h1>
              <p className="text-xs sm:text-sm text-text-secondary mt-1">
                Real-time multi-device synchronization, encrypted cloud backup snapshots, and offline change tracking.
              </p>
            </div>

            <CloudSyncButton onSyncComplete={fetchData} />
          </div>

          <SyncStatusCard
            lastSyncedAt={status?.lastSyncedAt}
            storageUsedMb={status?.storageUsedMb}
            storageLimitMb={status?.storageLimitMb}
            deviceCount={devices.length}
          />

          {/* Connected Devices */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-brand-cyan" /> Connected Registered Devices ({devices.length})
              </h3>
              <Link href="/devices" className="text-xs font-bold text-brand-cyan hover:underline">
                Manage Devices →
              </Link>
            </div>

            <DeviceList
              devices={devices}
              onRemoveDevice={async (id) => {
                await fetchApi(`/devices/${id}`, { method: 'DELETE' });
                fetchData();
              }}
            />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
