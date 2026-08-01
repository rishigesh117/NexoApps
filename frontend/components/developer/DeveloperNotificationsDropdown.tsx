import React, { useState, useEffect } from 'react';
import { DeveloperNotificationItem } from '../../types';
import { developerService } from '../../services/developerService';
import { Bell, CheckCircle2, AlertTriangle, Star, Rocket, XCircle, ShieldCheck } from 'lucide-react';

export const DeveloperNotificationsDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<DeveloperNotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = async () => {
    try {
      const res = await developerService.getNotifications();
      setNotifications(res.notifications || []);
      setUnreadCount(res.unreadCount || 0);
    } catch {
      setNotifications([
        {
          id: 'dev-notif-1',
          developerId: 'usr-demo-1',
          type: 'approved',
          title: 'App Submission Approved!',
          message: 'Your application Batlytics (v1.0.0-beta) has been approved by the Owner.',
          isRead: false,
          createdAt: new Date().toISOString(),
        },
      ]);
      setUnreadCount(1);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkAllRead = async () => {
    try {
      await developerService.markNotificationsRead();
      setUnreadCount(0);
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch {
      setUnreadCount(0);
    }
  };

  const getNotifIcon = (type: string) => {
    switch (type) {
      case 'approved':
      case 'version_published':
        return <Rocket className="w-4 h-4 text-emerald-400" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-rose-400" />;
      case 'needs_changes':
        return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      case 'app_featured':
        return <ShieldCheck className="w-4 h-4 text-brand-cyan" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-brand-violet" />;
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Developer Notifications"
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
            <span className="text-xs font-bold text-white">Developer Workspace Notifications</span>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllRead}
                className="text-[10px] text-brand-cyan hover:underline font-semibold"
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="space-y-2 max-h-72 overflow-y-auto scrollbar-none text-xs">
            {notifications.length === 0 ? (
              <p className="text-text-muted py-4 text-center text-xs">No workspace notifications yet.</p>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  className={`p-3 rounded-2xl border transition-all space-y-1 ${
                    !n.isRead ? 'bg-brand-cyan/10 border-brand-cyan/30' : 'bg-white/5 border-white/5 opacity-80'
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
