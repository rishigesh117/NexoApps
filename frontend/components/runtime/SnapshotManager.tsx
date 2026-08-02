import React from 'react';
import { Camera, CheckCircle2 } from 'lucide-react';

export const SnapshotManager: React.FC = () => {
  const snapshots = [
    { name: 'snapshot_v5.1_pre_upgrade', instance: 'inst-prod-worker-01', size: '500 MB', status: 'ready' },
  ];

  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">Runtime Instance Snapshots</h3>
          <p className="text-xs text-text-muted">Capture and restore runtime container memory and disk states</p>
        </div>
        <button className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-brand-cyan transition-colors">
          <Camera className="w-3.5 h-3.5" /> Take Snapshot
        </button>
      </div>

      <div className="space-y-3">
        {snapshots.map((s) => (
          <div key={s.name} className="p-4 rounded-2xl bg-surface-100 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Camera className="w-4 h-4 text-violet-400" />
              <div>
                <h4 className="font-mono text-xs font-bold text-white">{s.name}</h4>
                <p className="text-[10px] text-text-muted font-mono mt-0.5">Instance: {s.instance} • {s.size}</p>
              </div>
            </div>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
        ))}
      </div>
    </div>
  );
};
