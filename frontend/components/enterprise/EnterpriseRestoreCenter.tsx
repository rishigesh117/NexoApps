import React, { useState } from 'react';
import { RefreshCw, RotateCcw, ShieldCheck } from 'lucide-react';

export const EnterpriseRestoreCenter: React.FC = () => {
  const [restorePoints] = useState([
    { id: 'rp-1', tag: 'v9.0-lts-stable-tag', backupId: 'bk-1', date: new Date().toISOString() }
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <RotateCcw className="w-6 h-6 text-brand-cyan" /> Enterprise Restore Center
        </h2>
        <p className="text-text-muted text-sm">Disaster recovery restore points & zero-downtime rollback controls</p>
      </div>

      <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
        {restorePoints.map((rp) => (
          <div key={rp.id} className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-white text-sm">Restore Tag: {rp.tag}</h4>
              <p className="text-text-muted text-xs">Backup Ref: {rp.backupId}</p>
            </div>
            <button className="px-3 py-1.5 bg-brand-cyan/20 text-brand-cyan rounded-lg text-xs font-semibold hover:bg-brand-cyan/30 transition flex items-center gap-1">
              <RotateCcw className="w-3.5 h-3.5" /> Restore System
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
