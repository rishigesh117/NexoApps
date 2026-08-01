import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { SystemHealthGrid } from '../../components/operations/SystemHealthGrid';
import { LogViewer } from '../../components/operations/LogViewer';
import { getServerMetrics, getSystemLogs } from '../../services/monitoringService';
import { ServerMetrics } from '../../types';
import { Activity, ShieldCheck, Terminal } from 'lucide-react';

export default function AdminOperationsPage() {
  const [metrics, setMetrics] = useState<ServerMetrics | undefined>(undefined);
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    Promise.all([getServerMetrics(), getSystemLogs()])
      .then(([m, l]) => {
        setMetrics(m);
        setLogs(l);
      })
      .catch(() => {});
  }, []);

  return (
    <AdminLayout title="Enterprise Operations Console | NexoApps Admin">
      <div className="space-y-8 text-left">
        <div className="glass-panel p-6 rounded-3xl border border-white/10 flex items-center justify-between shadow-2xl">
          <div>
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              <Activity className="w-6 h-6 text-brand-cyan" /> Operations & Observability Console (v2.0 EC1)
            </h1>
            <p className="text-xs text-text-secondary mt-1">
              Production telemetry, system health metrics, Redis status, and live LogStream.
            </p>
          </div>
        </div>

        <SystemHealthGrid metrics={metrics} />
        <LogViewer logs={logs} />
      </div>
    </AdminLayout>
  );
}
