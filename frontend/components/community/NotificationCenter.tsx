import React, { useState, useEffect } from 'react';
import { NotificationItem } from '../../types';
import { communityService } from '../../services/communityService';
import { useAuth } from '../../context/AuthContext';
import { Bell, Rocket, ShieldCheck, Star, AlertTriangle, Download, UserPlus, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const NotificationCenter: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = async () => {
    if (!isAuthenticated) return;
    try {
      const res = await communityService.getNotifications();
      setNotifications(res.notifications || []);
      setUnreadCount(res.unreadCount || 0);
    } catch {
      setNotifications([]);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [isAuthenticated]);

  const handleMarkRead = async (id?: string) => {
    try {
      await communityService.markNotificationsRead(id);
      setUnreadCount(0);
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch {}
  };

  const getNotifIcon = (type: string) => {
    switch (type) {
      case 'developer_published':
      case 'app_updated':
        return <Rocket className="w-4 h-4 text-emerald-400" />;
      case 'app_featured':
        return <ShieldCheck className="w-4 h-4 text-brand-cyan" />;
      case 'review_reply':
        return <Star className="w-4 h-4 text-amber-400 fill-amber-400" />;
      case 'download_completed':
        return <Download className="w-4 h-4 text-brand-blue" />;
      case 'developer_followed':
        return <UserPlus className="w-4 h-4 text-brand-violet" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-amber-400" />;
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="User Notifications"
        className="p-2.5 rounded-xl bg-surface-100 border border-white/10 text-text-secondary hover:text-white hover:border-brand-cyan/40 transition-all relative"
      >
        <Bell className="w-4 h-4 text-brand-cyan" />
        {unreadCount > 0 && (
          <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan absolute top-1.5 right-1.5 animate-pulse shadow-glow-cyan" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 glass-panel rounded-3xl border border-white/15 p-4 shadow-2xl z-50 space-y-3 text-left">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-xs font-bold text-white">Notifications Center</span>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={() => handleMarkRead()}
                className="text-[10px] text-brand-cyan hover:underline font-semibold"
              >
                Mark all as read
              </button>
            )}
          </div>

          <div className="space-y-2 max-h-80 overflow-y-auto scrollbar-none text-xs">
            {notifications.length === 0 ? (
              <p className="text-text-muted py-6 text-center text-xs">No notifications yet.</p>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  className={`p-3 rounded-2xl border transition-all space-y-1 ${
                    !n.read ? 'bg-brand-cyan/10 border-brand-cyan/30' : 'bg-white/5 border-white/5 opacity-80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getNotifIcon(n.type)}
                      <span className="font-bold text-white">{n.title}</span>
                    </div>
                    <span className="text-[10px] text-text-muted">
                      {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-[11px] text-text-secondary leading-relaxed">{n.message}</p>
                </div>
              ))
            )}
          </div>

          <div className="pt-2 border-t border-white/10 text-center">
            <Link href="/notifications" className="text-[11px] font-bold text-brand-cyan hover:underline">
              View All Notifications →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
