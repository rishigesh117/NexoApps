import React, { useState, useEffect } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { DeviceList } from '../components/cloud/DeviceList';
import { fetchApi } from '../services/apiClient';
import { UserDevice } from '../types';
import { Smartphone, Shield } from 'lucide-react';

export default function DevicesPage() {
  const [devices, setDevices] = useState<UserDevice[]>([]);

  const fetchDevices = async () => {
    try {
      const res = await fetchApi<{ success: boolean; data: UserDevice[] }>('/devices');
      setDevices(res.data || []);
    } catch {
      setDevices([]);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  return (
    <>
      <SEOHead
        title="Registered Devices & Sessions | NexoApps"
        description="Manage signed-in devices, active sessions, and security permissions across mobile phones and desktop computers."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8 text-left">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <Smartphone className="w-6 h-6 text-brand-cyan" /> Registered Devices & Active Sessions
            </h1>
            <p className="text-xs sm:text-sm text-text-secondary">
              Review all mobile phones, tablets, and desktop browsers authorized to access your NexoApps account state.
            </p>
          </div>

          <DeviceList
            devices={devices}
            onRemoveDevice={async (id) => {
              await fetchApi(`/devices/${id}`, { method: 'DELETE' });
              fetchDevices();
            }}
          />
        </main>

        <Footer />
      </div>
    </>
  );
}
