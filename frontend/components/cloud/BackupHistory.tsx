import React from 'react';
import { CloudBackup } from '../../types';
import { ShieldCheck, RotateCcw, DownloadCloud, Lock } from 'lucide-react';

interface BackupHistoryProps {
  backups: CloudBackup[];
  onRestore: (backupId: string) => void;
}

export const BackupHistory: React.FC<BackupHistoryProps> = ({ backups, onRestore }) => {
  return (
    <div className="space-y-4 text-left">
      {backups.map((b) => (
        <div key={b.id} className="glass-panel p-5 rounded-3xl border border-white/10 space-y-3 transition-all">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <h4 className="font-extrabold text-white text-sm">{b.backupName}</h4>
                {b.isAutoBackup && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-violet/20 text-brand-violet border border-brand-violet/30">
                    Auto Snapshot
                  </span>
                )}
              </div>
              <span className="text-[11px] text-text-muted">
                Created: {new Date(b.createdAt).toLocaleString()} • Version: {b.version}
              </span>
            </div>

            <button
              type="button"
              onClick={() => onRestore(b.id)}
              className="px-4 py-2 rounded-full text-xs font-bold text-slate-950 bg-gradient-to-r from-brand-cyan to-brand-violet hover:shadow-glow-cyan flex items-center gap-1.5 transition-all shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restore Snapshot</span>
            </button>
          </div>

          <div className="flex items-center justify-between text-xs text-text-muted">
            <span className="flex items-center gap-1 font-mono text-[11px]">
              <Lock className="w-3 h-3 text-emerald-400" /> Encrypted SHA-256 Digest
            </span>
            <span className="font-mono text-[11px] text-white font-bold">
              {(b.sizeBytes / 1024 / 1024).toFixed(2)} MB
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
