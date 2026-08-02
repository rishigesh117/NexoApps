import React from 'react';
import { HardDrive, Play, CheckCircle2 } from 'lucide-react';

export const BackupManager: React.FC = () => {
  const backups = [
    { name: 'backup_full_daily_20260802', type: 'full', location: 's3://nexo-backups/daily', size: '5.37 GB', status: 'completed' },
    { name: 'backup_full_daily_20260801', type: 'full', location: 's3://nexo-backups/daily', size: '5.24 GB', status: 'completed' },
    { name: 'backup_inc_hourly_1200', type: 'incremental', location: 's3://nexo-backups/inc', size: '104 MB', status: 'completed' },
  ];

  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">System Backup Manager</h3>
          <p className="text-xs text-text-muted">Full database snapshots, incremental backups, and cloud storage targets</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold shadow-glow-cyan hover:opacity-95 transition-all">
          <Play className="w-3.5 h-3.5" /> Trigger Backup
        </button>
      </div>

      <div className="space-y-3">
        {backups.map((b) => (
          <div key={b.name} className="p-4 rounded-2xl bg-surface-100 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <HardDrive className="w-4 h-4 text-blue-400" />
              <div>
                <h4 className="font-mono text-xs font-bold text-white">{b.name}</h4>
                <p className="text-[10px] text-text-muted font-mono mt-0.5">{b.type.toUpperCase()} • {b.size} • {b.location}</p>
              </div>
            </div>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
        ))}
      </div>
    </div>
  );
};
