import React, { useState, useEffect } from 'react';
import { Bell, CheckCircle2 } from 'lucide-react';
import { notificationCenterService } from '../../services/notificationCenterService';

export const NotificationCenter: React.FC = () => {
  const [notifs, setNotifs] = useState<any[]>([]);

  useEffect(() => {
    fetchNotifs();
  }, []);

  const fetchNotifs = async () => {
    try {
      const res = await notificationCenterService.listNotifications();
      if (res.success) setNotifs(res.data);
    } catch (err) {
      console.error('Failed to load notifications', err);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-base font-bold text-white flex items-center gap-2">
        <Bell className="w-5 h-5 text-rose-400" />
        Centralized Notification & System Alerts
      </h3>

      <div className="space-y-3">
        {notifs.map((n) => (
          <div key={n.id} className="p-4 rounded-2xl bg-surface-100 border border-white/10 text-xs flex items-center justify-between">
            <div>
              <h4 className="font-bold text-white">{n.title}</h4>
              <p className="text-text-muted mt-0.5">{n.message}</p>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase">
              {n.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
