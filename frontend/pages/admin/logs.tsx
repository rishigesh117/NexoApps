import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { LogViewer } from '../../components/operations/LogViewer';
import { getSystemLogs } from '../../services/monitoringService';
import { Terminal } from 'lucide-react';

export default function AdminLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    getSystemLogs().then((l) => setLogs(l)).catch(() => {});
  }, []);

  return (
    <AdminLayout title="Real-Time System Logs | NexoApps Admin">
      <div className="space-y-8 text-left">
        <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Terminal className="w-6 h-6 text-emerald-400" /> Real-Time Application Log Viewer
          </h1>
          <p className="text-xs text-text-secondary">
            Stream API server logs, background job events, and cloud sync logs in real time.
          </p>
        </div>

        <LogViewer logs={logs} />
      </div>
    </AdminLayout>
  );
}
