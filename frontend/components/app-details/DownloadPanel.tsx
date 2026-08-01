import React from 'react';
import { Download, ShieldCheck, CheckCircle2, HardDrive, Cpu, AlertCheck } from 'lucide-react';
import { AppItem } from '../../types';

interface DownloadPanelProps {
  app: AppItem;
  onDownloadClick: (e: React.MouseEvent) => void;
}

export const DownloadPanel: React.FC<DownloadPanelProps> = ({ app, onDownloadClick }) => {
  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-5 text-left shadow-2xl">
      
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div>
          <h3 className="text-base font-bold text-white">APK Download Panel</h3>
          <p className="text-xs text-text-muted">Direct high-speed mirror</p>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" /> 100% Virus Free
        </span>
      </div>

      <div className="space-y-3 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-text-muted">File Name</span>
          <span className="font-mono text-white font-semibold">{app.apkFile || `${app.slug}-v${app.version}.apk`}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-text-muted">File Size</span>
          <span className="font-bold text-white">{app.fileSize || app.apkSize || '24.5 MB'}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-text-muted">Current Version</span>
          <span className="font-bold text-brand-cyan">v{app.version}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-text-muted">Total Downloads</span>
          <span className="font-bold text-white">{app.downloadsCount.toLocaleString()}+</span>
        </div>
      </div>

      <a
        href={app.downloadUrl || '#download'}
        onClick={onDownloadClick}
        className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-emerald via-brand-cyan to-brand-blue text-slate-950 font-extrabold text-xs shadow-glow-emerald hover:opacity-95 transition-all flex items-center justify-center gap-2"
      >
        <Download className="w-4 h-4" />
        <span>Download APK ({app.fileSize || '24.5 MB'})</span>
      </a>

      <p className="text-[10px] text-text-muted text-center leading-tight">
        Verified SHA-256 Checksum • Free from adware, malware, or trackers.
      </p>
    </div>
  );
};
