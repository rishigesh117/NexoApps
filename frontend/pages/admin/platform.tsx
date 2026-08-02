import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { PlatformHealthPanel } from '../../components/platform/PlatformHealthPanel';
import { getPlatformHealth } from '../../services/platformService';
import { PlatformHealth } from '../../types';
import { Shield } from 'lucide-react';

export default function AdminPlatformPage() {
  const [health, setHealth] = useState<PlatformHealth | undefined>(undefined);

  useEffect(() => {
    getPlatformHealth().then((h) => setHealth(h)).catch(() => {});
  }, []);

  return (
    <AdminLayout title="Enterprise Platform Operations Console | NexoApps Admin">
      <div className="space-y-8 text-left">
        <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Shield className="w-6 h-6 text-emerald-400" /> Enterprise Platform Operations & Orchestration
          </h1>
          <p className="text-xs text-text-secondary">
            Full control panel for platform health monitoring, system announcements, and cross-module automation rules.
          </p>
        </div>

        <PlatformHealthPanel health={health} />
      </div>
    </AdminLayout>
  );
}
