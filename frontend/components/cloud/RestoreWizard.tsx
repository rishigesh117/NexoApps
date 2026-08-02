import React, { useState } from 'react';
import { RefreshCw, CheckCircle2, AlertTriangle } from 'lucide-react';

export const RestoreWizard: React.FC = () => {
  const [selectedBackup, setSelectedBackup] = useState('backup_full_daily_20260802');
  const [restoring, setRestoring] = useState(false);
  const [restored, setRestored] = useState(false);

  const handleRestore = () => {
    setRestoring(true);
    setTimeout(() => {
      setRestoring(false);
      setRestored(true);
    }, 1500);
  };

  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-6">
      <div>
        <h3 className="text-lg font-bold text-white">Disaster Recovery Restore Wizard</h3>
        <p className="text-xs text-text-muted">Restore platform database and state from a verified backup snapshot</p>
      </div>

      {restored ? (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-400 text-xs font-semibold">
          <CheckCircle2 className="w-5 h-5" />
          <span>System state successfully restored from {selectedBackup}. All services operational.</span>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3 text-amber-300 text-xs">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <span>Warning: Performing a restore will overwrite current database state with snapshot data.</span>
          </div>

          <button
            onClick={handleRestore}
            disabled={restoring}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold shadow-glow-cyan hover:opacity-95 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${restoring ? 'animate-spin' : ''}`} />
            <span>{restoring ? 'Restoring System State...' : 'Execute System Restore'}</span>
          </button>
        </div>
      )}
    </div>
  );
};
