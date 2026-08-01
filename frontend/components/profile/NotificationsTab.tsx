import React from 'react';
import { Bell, ShieldAlert, Sparkles, CheckCircle2, Info } from 'lucide-react';

export const NotificationsTab: React.FC = () => {
  const notifications = [
    {
      id: 'notif-1',
      title: 'Welcome to NexoApps Platform',
      message: 'Your account has been created. Explore applications and review your downloads in the Account Center.',
      type: 'SYSTEM',
      date: '2026-07-28',
      read: false,
    },
    {
      id: 'notif-2',
      title: 'Security Alert: New Session Registered',
      message: 'A new session was authenticated from Chrome on Windows.',
      type: 'SECURITY',
      date: '2026-07-28',
      read: true,
    },
  ];

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 text-left">
      <div className="pb-4 border-b border-white/10 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Bell className="w-5 h-5 text-brand-cyan" /> Notification Center
          </h3>
          <p className="text-xs text-text-muted mt-0.5">
            System messages, security alerts, and feature update announcements
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`p-4 rounded-2xl border transition-all ${
              notif.type === 'SECURITY'
                ? 'bg-amber-500/10 border-amber-500/30'
                : 'bg-surface-100/80 border-white/10'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-surface-200 border border-white/10 shrink-0">
                {notif.type === 'SECURITY' ? (
                  <ShieldAlert className="w-4 h-4 text-amber-400" />
                ) : (
                  <Info className="w-4 h-4 text-brand-cyan" />
                )}
              </div>

              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white">{notif.title}</h4>
                  <span className="text-[10px] text-text-muted">{notif.date}</span>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">{notif.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
