import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { RuntimeDashboard } from '../../components/ai-platform/RuntimeDashboard';
import { getRuntimeTelemetry } from '../../services/runtimeService';
import { RuntimeLog } from '../../types';
import { Activity } from 'lucide-react';

export default function AdminRuntimePage() {
  const [telemetry, setTelemetry] = useState<RuntimeLog | undefined>(undefined);

  useEffect(() => {
    getRuntimeTelemetry().then((data) => setTelemetry(data)).catch(() => {});
  }, []);

  return (
    <AdminLayout title="Admin AI Runtime Telemetry | NexoApps Admin">
      <div className="space-y-8 text-left">
        <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Activity className="w-6 h-6 text-brand-cyan" /> Enterprise AI Runtime & GPU Telemetry Operations
          </h1>
          <p className="text-xs text-text-secondary">
            Inspect real-time GPU cluster utilization, VRAM load, and edge inference request throughput.
          </p>
        </div>

        <RuntimeDashboard telemetry={telemetry} />
      </div>
    </AdminLayout>
  );
}
