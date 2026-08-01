import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { SystemHealthGrid } from '../../components/operations/SystemHealthGrid';
import { getServerMetrics } from '../../services/monitoringService';
import { ServerMetrics } from '../../types';
import { HardDrive, Server } from 'lucide-react';

export default function AdminSystemPage() {
  const [metrics, setMetrics] = useState<ServerMetrics | undefined>(undefined);

  useEffect(() => {
    getServerMetrics().then((m) => setMetrics(m)).catch(() => {});
  }, []);

  return (
    <AdminLayout title="System Telemetry & Infrastructure | NexoApps Admin">
      <div className="space-y-8 text-left">
        <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Server className="w-6 h-6 text-brand-violet" /> Infrastructure & Server Telemetry
          </h1>
          <p className="text-xs text-text-secondary">
            PostgreSQL connection pool metrics, Redis cache status, CPU memory load, and API response latencies.
          </p>
        </div>

        <SystemHealthGrid metrics={metrics} />
      </div>
    </AdminLayout>
  );
}
