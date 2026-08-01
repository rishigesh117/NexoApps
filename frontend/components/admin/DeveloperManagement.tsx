import React, { useState } from 'react';
import { DeveloperProfile } from '../../types';
import { adminService } from '../../services/adminService';
import { Code2, BadgeCheck, ShieldAlert, CheckCircle2, X } from 'lucide-react';

interface DeveloperManagementProps {
  developers: DeveloperProfile[];
  onRefresh: () => void;
}

export const DeveloperManagement: React.FC<DeveloperManagementProps> = ({
  developers,
  onRefresh,
}) => {
  const handleToggleVerification = async (dev: DeveloperProfile) => {
    try {
      await adminService.updateDeveloper(dev.id, { isVerified: !dev.isVerified });
      onRefresh();
    } catch (err: any) {
      alert(err.message || 'Failed to update developer verification');
    }
  };

  const handleToggleStatus = async (dev: DeveloperProfile) => {
    const nextStatus = dev.status === 'Suspended' ? 'Active' : 'Suspended';
    try {
      await adminService.updateDeveloper(dev.id, { status: nextStatus });
      onRefresh();
    } catch (err: any) {
      alert(err.message || 'Failed to update developer status');
    }
  };

  return (
    <div className="space-y-6 text-left">
      <div className="glass-panel p-6 rounded-3xl border border-white/10 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-black text-white flex items-center gap-2">
            <Code2 className="w-5 h-5 text-brand-violet" /> Registered Developer Profiles
          </h3>
          <p className="text-xs text-text-secondary">
            Grant verified developer checkmarks, manage studio accounts, and review developer standing.
          </p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-violet/20 text-brand-violet border border-brand-violet/30">
          {developers.length} Developers
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {developers.map((dev) => (
          <div
            key={dev.id}
            className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 hover:border-white/20 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-brand-cyan to-brand-violet p-0.5 shrink-0">
                    <img
                      src={dev.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                      alt={dev.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-extrabold text-white">{dev.name}</h4>
                      {dev.isVerified && (
                        <BadgeCheck className="w-4 h-4 text-brand-cyan shrink-0" title="Verified Developer" />
                      )}
                    </div>
                    <span className="text-[11px] text-text-muted">{dev.email}</span>
                  </div>
                </div>

                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                    dev.status === 'Suspended'
                      ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                      : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                  }`}
                >
                  {dev.status}
                </span>
              </div>

              <p className="text-xs text-text-secondary line-clamp-2">{dev.bio}</p>

              <div className="flex items-center gap-3 text-xs text-text-muted pt-1">
                <span>Total Apps: <strong className="text-white">{dev.totalApps}</strong></span>
                <span>•</span>
                <a href={dev.website} target="_blank" rel="noreferrer" className="text-brand-cyan hover:underline truncate">
                  {dev.website}
                </a>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/5">
              <button
                onClick={() => handleToggleVerification(dev)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  dev.isVerified
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                    : 'bg-brand-cyan/20 text-brand-cyan border-brand-cyan/30'
                }`}
              >
                {dev.isVerified ? 'Revoke Verified' : 'Grant Verified'}
              </button>

              <button
                onClick={() => handleToggleStatus(dev)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  dev.status === 'Suspended'
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                    : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                }`}
              >
                {dev.status === 'Suspended' ? 'Activate Developer' : 'Suspend Developer'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
