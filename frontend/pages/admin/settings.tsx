import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { SystemHealthCard } from '../../components/admin/SystemHealthCard';
import { Settings, Shield, Server, Database, Save, CheckCircle2 } from 'lucide-react';

export default function AdminSettingsPage() {
  const mockHealth = {
    serverStatus: 'Operational' as const,
    databaseStatus: 'Connected' as const,
    uptimeSeconds: 18450,
    memoryUsageMb: 82,
    cpuLoadPercentage: 3.6,
    activeSockets: 22,
    lastBackupAt: new Date().toISOString(),
  };

  return (
    <AdminLayout title="Console Settings | NexoApps Admin">
      <div className="space-y-6 text-left">
        
        {/* Header */}
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-1">
          <h3 className="text-xl font-black text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-brand-cyan" /> Platform Configuration & System Health
          </h3>
          <p className="text-xs text-text-secondary">
            Manage global platform properties, security policies, and monitor system health status.
          </p>
        </div>

        {/* System Health Status Card */}
        <SystemHealthCard health={mockHealth} />

        {/* General Platform Controls */}
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-5">
          <h4 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
            <Shield className="w-4 h-4 text-brand-violet" /> Global Security & Platform Controls
          </h4>

          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <div>
                <span className="font-bold text-white block">Guest APK Downloading</span>
                <span className="text-text-muted text-[11px]">Require user authentication before allowing APK downloads</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold text-[11px]">
                Enforced (Login Required)
              </span>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <div>
                <span className="font-bold text-white block">Review Moderation</span>
                <span className="text-text-muted text-[11px]">Require single review per user per application</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold text-[11px]">
                Active (1 Review Limit)
              </span>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <div>
                <span className="font-bold text-white block">Automatic System Backups</span>
                <span className="text-text-muted text-[11px]">Daily database snapshot backups to encrypted cloud storage</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30 font-semibold text-[11px]">
                Every 24 Hours
              </span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
