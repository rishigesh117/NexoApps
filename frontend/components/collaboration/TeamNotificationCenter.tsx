import React, { useEffect, useState } from 'react';
import { Bell, Check, Info, AlertCircle } from 'lucide-react';
import { getTeamNotifications } from '../../services/collaborationAnalyticsService';
import { TeamNotification } from '../../../shared/types';

export const TeamNotificationCenter: React.FC = () => {
  const [notifications, setNotifications] = useState<TeamNotification[]>([]);

  useEffect(() => {
    getTeamNotifications().then(setNotifications);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Bell className="w-6 h-6 text-brand-cyan" /> Team Notification Center
        </h2>
        <p className="text-text-muted text-sm">System notifications, channel mentions & system updates</p>
      </div>

      <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
        {notifications.map((n) => (
          <div key={n.id} className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-start gap-3">
            <div className="p-2 bg-brand-cyan/20 text-brand-cyan rounded-lg mt-0.5">
              <Info className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-white text-sm">{n.title}</h4>
              <p className="text-text-muted text-xs mt-1">{n.message}</p>
            </div>
            <span className="text-xs text-text-muted">{new Date(n.createdAt).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
