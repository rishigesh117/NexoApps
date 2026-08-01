import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { AuditTable } from '../../components/operations/AuditTable';
import { getAuditLogs } from '../../services/auditService';
import { AuditLogEntry } from '../../types';
import { ShieldCheck } from 'lucide-react';

export default function AdminAuditPage() {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);

  useEffect(() => {
    getAuditLogs().then((l) => setLogs(l)).catch(() => {});
  }, []);

  return (
    <AdminLayout title="Enterprise Audit Logs | NexoApps Admin">
      <div className="space-y-8 text-left">
        <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-400" /> Security Audit Log Engine
          </h1>
          <p className="text-xs text-text-secondary">
            Immutable audit record of login events, build uploads, administrative actions, and role modifications.
          </p>
        </div>

        <AuditTable logs={logs} />
      </div>
    </AdminLayout>
  );
}
