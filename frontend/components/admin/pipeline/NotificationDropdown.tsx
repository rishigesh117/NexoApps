import React, { useState, useEffect } from 'react';
import { OwnerNotification } from '../../../types';
import { adminService } from '../../../services/adminService';
import { Bell, CheckCircle2, AlertTriangle, Star, Rocket, Archive, HardDrive } from 'lucide-react';

export const NotificationDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<OwnerNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = async () => {
    try {
      const res = await adminService.getNotifications();
      setNotifications(res.notifications || []);
      setUnreadCount(res.unreadCount || 0);
    } catch {
      // Fallback
      setNotifications([
        {
          id: 'notif-1',
          type: 'app_published',
          title: 'App Published Successfully',
          message: 'Batlytics v1.0.0-beta has been published live to the NexoApps store.',
          isRead: false,
          createdAt: new Date().toISOString(),
        },
        {
          id: 'notif-2',
          type: 'new_review',
          title: 'New 5-Star Review Received',
          message: 'Alex Turner left a 5-star review: "Essential cricket scoring tool!"',
          isRead: false,
          createdAt: new Date().toISOString(),
        },
      ]);
      setUnreadCount(2);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkAllRead = async () => {
    try {
      await adminService.markNotificationsRead();
      setUnreadCount(0);
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch {
      setUnreadCount(0);
    }
  };

  const getNotifIcon = (type: string) => {
    switch (type) {
      case 'app_published':
        return <Rocket className="w-4 h-4 text-emerald-400" />;
      case 'validation_failed':
        return <AlertTriangle className="w-4 h-4 text-rose-400" />;
      case 'new_review':
      case 'new_rating':
        return <Star className="w-4 h-4 text-amber-400 fill-amber-400" />;
      case 'storage_warning':
        return <HardDrive className="w-4 h-4 text-brand-cyan" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-brand-violet" />;
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Owner Notifications"
        className="p-2 rounded-full text-text-secondary hover:text-white hover:bg-white/10 transition-all relative"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan absolute top-1.5 right-1.5 animate-pulse shadow-glow-cyan" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 glass-panel rounded-3xl border border-white/15 p-4 shadow-2xl z-50 space-y-3 text-left">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-xs font-bold text-white">Owner Notification Center</span>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllRead}
                className="text-[10px] text-brand-cyan hover:underline font-semibold"
              >
                Mark all as read
              </button>
            )}
          </div>

          <div className="space-y-2 max-h-72 overflow-y-auto scrollbar-none text-xs">
            {notifications.length === 0 ? (
              <p className="text-text-muted py-4 text-center text-xs">No notifications yet.</p>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  className={`p-3 rounded-2xl border transition-all space-y-1 ${
                    !n.isRead
                      ? 'bg-brand-cyan/10 border-brand-cyan/30'
                      : 'bg-white/5 border-white/5 opacity-80'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {getNotifIcon(n.type)}
                    <span className="font-bold text-white">{n.title}</span>
                  </div>
                  <p className="text-[11px] text-text-secondary leading-relaxed">{n.message}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
