import React, { useEffect, useState } from 'react';
import { HardDrive, Plus, CheckCircle2 } from 'lucide-react';
import { getDatabaseBackups } from '../../services/backupService';
import { BackupPolicy, BackupJob } from '../../../shared/types';

export const BackupCenter: React.FC = () => {
  const [data, setData] = useState<{ policies: BackupPolicy[]; jobs: BackupJob[] }>({ policies: [], jobs: [] });

  useEffect(() => {
    getDatabaseBackups().then(setData);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <HardDrive className="w-6 h-6 text-brand-cyan" /> Database Backup & PITR Orchestration
          </h2>
          <p className="text-text-muted text-sm">Full backups, WAL archiving, retention policies & validation</p>
        </div>
        <button className="px-4 py-2 bg-brand-cyan text-background font-semibold rounded-xl text-sm hover:opacity-90 transition flex items-center gap-2">
          <Plus className="w-4 h-4" /> Create Policy
        </button>
      </div>

      <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-4">
        {data.policies.map((p) => (
          <div key={p.id} className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-base">{p.policyName}</h3>
              <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Enforced
              </span>
            </div>
            <p className="text-xs text-text-muted">Type: {p.backupType} • Retention: {p.retentionDays} Days • Cron: {p.scheduleCron}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
