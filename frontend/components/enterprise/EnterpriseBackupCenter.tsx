import React, { useState } from 'react';
import { HardDrive, Download, Plus, CheckCircle2 } from 'lucide-react';

export const EnterpriseBackupCenter: React.FC = () => {
  const [backups] = useState([
    { id: 'bk-1', name: 'Version 9.0 Production Snapshot', type: 'full', size: '10.0 GB', status: 'completed', date: new Date().toISOString() }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <HardDrive className="w-6 h-6 text-brand-cyan" /> Enterprise Backup Center
          </h2>
          <p className="text-text-muted text-sm">Platform disaster recovery snapshots & enterprise database backups</p>
        </div>
        <button className="px-4 py-2 bg-brand-cyan text-background font-semibold rounded-xl text-sm hover:opacity-90 transition flex items-center gap-2">
          <Plus className="w-4 h-4" /> Create Snapshot
        </button>
      </div>

      <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
        {backups.map((b) => (
          <div key={b.id} className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-white text-sm">{b.name}</h4>
              <p className="text-text-muted text-xs">Type: {b.type} • Size: {b.size}</p>
            </div>
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-lg flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Completed
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
