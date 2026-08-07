import React, { useState, useEffect } from 'react';
import { HardDrive, CheckCircle2 } from 'lucide-react';
import { releaseService } from '../../services/releaseService';
import { PlatformBackup } from '../../../shared/types';

export const BackupManager: React.FC = () => {
  const [backups, setBackups] = useState<PlatformBackup[]>([]);

  useEffect(() => {
    releaseService.getBackups().then(setBackups);
  }, []);

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <h2 className="text-2xl font-bold text-white mb-6">Automated Platform Backup Center</h2>
      <div className="space-y-4 max-w-4xl">
        {backups.map(b => (
          <div key={b.id} className="bg-slate-800 p-5 rounded-xl border border-slate-700 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <HardDrive className="w-5 h-5 text-blue-400" />
              <div>
                <h3 className="font-semibold text-white">{b.backupName}</h3>
                <p className="text-xs text-slate-400 font-mono">Storage: {b.storageUrl}</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded text-xs font-semibold uppercase">{b.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
