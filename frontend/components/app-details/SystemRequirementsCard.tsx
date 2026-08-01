import React from 'react';
import { Shield, Cpu, Wifi, HardDrive, Smartphone, Camera, Bell, Mic, CheckCircle2 } from 'lucide-react';
import { AppItem } from '../../types';

interface SystemRequirementsCardProps {
  app: AppItem;
}

export const SystemRequirementsCard: React.FC<SystemRequirementsCardProps> = ({ app }) => {
  const permissions = [
    { name: 'Internet Access', desc: 'Required for cloud backup & match sync', icon: <Wifi className="w-4 h-4 text-brand-cyan" /> },
    { name: 'Storage Access', desc: 'Required for saving PDF match reports locally', icon: <HardDrive className="w-4 h-4 text-emerald-400" /> },
    { name: 'Camera (Optional)', desc: 'For QR code match invite scanning', icon: <Camera className="w-4 h-4 text-purple-400" /> },
    { name: 'Push Notifications', desc: 'For match score alerts & tournament updates', icon: <Bell className="w-4 h-4 text-amber-400" /> },
    { name: 'Microphone (Optional)', desc: 'Voice match commentary logging', icon: <Mic className="w-4 h-4 text-rose-400" /> },
  ];

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 text-left">
      
      {/* 1. System Requirements */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Cpu className="w-5 h-5 text-brand-cyan" /> System Requirements
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-surface-100/80 border border-white/10 space-y-1">
            <span className="text-[10px] text-text-muted font-medium uppercase tracking-wider">Min OS Version</span>
            <p className="font-bold text-white">{app.minAndroidVersion || 'Android 8.0 (Oreo)'}</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-surface-100/80 border border-white/10 space-y-1">
            <span className="text-[10px] text-text-muted font-medium uppercase tracking-wider">Storage Required</span>
            <p className="font-bold text-white">{app.fileSize || app.apkSize || '25.0 MB'}</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-surface-100/80 border border-white/10 space-y-1">
            <span className="text-[10px] text-text-muted font-medium uppercase tracking-wider">Internet Connection</span>
            <p className="font-bold text-emerald-400">Offline & Online Ready</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-surface-100/80 border border-white/10 space-y-1">
            <span className="text-[10px] text-text-muted font-medium uppercase tracking-wider">Architecture</span>
            <p className="font-bold text-white">arm64-v8a / x86_64</p>
          </div>
        </div>
      </div>

      {/* 2. Permissions Checklist */}
      <div className="space-y-4 pt-4 border-t border-white/10">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Shield className="w-5 h-5 text-brand-cyan" /> Application Permissions
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {permissions.map((perm, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-surface-100/80 border border-white/10 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-surface-200 border border-white/10 shrink-0">
                {perm.icon}
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">{perm.name}</h4>
                <p className="text-[11px] text-text-muted">{perm.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
