import React from 'react';
import { Cloud, CheckCircle2, Clock, HardDrive, Smartphone } from 'lucide-react';

interface SyncStatusCardProps {
  lastSyncedAt?: string;
  storageUsedMb?: number;
  storageLimitMb?: number;
  deviceCount?: number;
}

export const SyncStatusCard: React.FC<SyncStatusCardProps> = ({
  lastSyncedAt = new Date().toISOString(),
  storageUsedMb = 14.8,
  storageLimitMb = 1024,
  deviceCount = 2,
}) => {
  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 text-left shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Cloud className="w-5 h-5 text-brand-cyan" />
          <h3 className="text-base font-extrabold text-white">Cloud State Synchronization</h3>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5" /> Fully Synced
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1">
          <span className="text-text-muted flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-brand-cyan" /> Last Sync Time
          </span>
          <p className="font-bold text-white text-xs">{new Date(lastSyncedAt).toLocaleString()}</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1">
          <span className="text-text-muted flex items-center gap-1">
            <HardDrive className="w-3.5 h-3.5 text-brand-violet" /> Storage Consumed
          </span>
          <p className="font-bold text-white text-xs">{storageUsedMb} MB / {storageLimitMb} MB</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1">
          <span className="text-text-muted flex items-center gap-1">
            <Smartphone className="w-3.5 h-3.5 text-amber-400" /> Connected Devices
          </span>
          <p className="font-bold text-white text-xs">{deviceCount} Devices Active</p>
        </div>
      </div>
    </div>
  );
};
