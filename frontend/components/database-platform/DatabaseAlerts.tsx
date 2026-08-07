import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

export const DatabaseAlerts: React.FC = () => {
  const [alerts] = useState([
    { id: 'dba-1', title: 'PostgreSQL WAL Archiving Synced', severity: 'info', message: 'WAL logs uploaded to S3 storage bucket.', resolved: true }
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-brand-cyan" /> Database Alerts & Notification Center
        </h2>
        <p className="text-text-muted text-sm">Cluster alerts, slow query warnings & replication lag notifications</p>
      </div>

      <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
        {alerts.map((a) => (
          <div key={a.id} className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-white text-sm">{a.title}</h4>
              <p className="text-text-muted text-xs">{a.message}</p>
            </div>
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-lg flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Resolved
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
