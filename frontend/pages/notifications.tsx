import React, { useState, useEffect } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { communityService } from '../services/communityService';
import { NotificationItem } from '../types';
import { useAuth } from '../context/AuthContext';
import { Bell, CheckCircle2, Rocket, ShieldCheck, Star, Download, UserPlus, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function NotificationsPage() {
  const { isAuthenticated } = useAuth();
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

  const handleMarkAllRead = async () => {
    try {
      await communityService.markNotificationsRead();
      setUnreadCount(0);
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch {}
  };

  const getNotifIcon = (type: string) => {
    switch (type) {
      case 'developer_published':
      case 'app_updated':
        return <Rocket className="w-5 h-5 text-emerald-400" />;
      case 'app_featured':
        return <ShieldCheck className="w-5 h-5 text-brand-cyan" />;
      case 'review_reply':
        return <Star className="w-5 h-5 text-amber-400 fill-amber-400" />;
      case 'download_completed':
        return <Download className="w-5 h-5 text-brand-blue" />;
      case 'developer_followed':
        return <UserPlus className="w-5 h-5 text-brand-violet" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <>
      <SEOHead
        title="Notifications Center | NexoApps"
        description="Stay updated with developer releases, app updates, wishlist alerts, and platform announcements."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 space-y-6 text-left">
          <div className="glass-panel p-6 rounded-3xl border border-white/10 flex items-center justify-between shadow-2xl">
            <div>
              <h1 className="text-2xl font-black text-white flex items-center gap-2">
                <Bell className="w-6 h-6 text-brand-cyan" /> Notifications Center
              </h1>
              <p className="text-xs text-text-secondary">
                Track developer releases, version updates, wishlist alerts, and review replies.
              </p>
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllRead}
                className="px-4 py-2 rounded-full text-xs font-bold text-brand-cyan bg-brand-cyan/20 border border-brand-cyan/30 hover:bg-brand-cyan/30 transition-all"
              >
                Mark All as Read
              </button>
            )}
          </div>

          {!isAuthenticated ? (
            <div className="glass-panel p-12 rounded-3xl border border-white/10 text-center space-y-4">
              <p className="text-xs text-text-muted">Please log in to view your personalized notification stream.</p>
            </div>
          ) : notifications.length === 0 ? (
            <div className="glass-panel p-12 rounded-3xl border border-white/10 text-center space-y-4">
              <p className="text-xs text-text-muted">No notifications in your stream.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((item) => (
                <div
                  key={item.id}
                  className={`glass-card p-5 rounded-3xl border transition-all flex items-start justify-between gap-4 text-xs ${
                    !item.read ? 'bg-brand-cyan/10 border-brand-cyan/30 shadow-glow-cyan' : 'border-white/10 opacity-85'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-2xl bg-white/10 shrink-0">{getNotifIcon(item.type)}</div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-white text-sm">{item.title}</h4>
                      <p className="text-text-secondary leading-relaxed text-xs">{item.message}</p>
                      <span className="text-[10px] text-text-muted block font-mono pt-1">
                        {new Date(item.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {item.link && (
                    <Link
                      href={item.link}
                      className="px-4 py-2 rounded-full text-xs font-bold text-slate-950 bg-gradient-to-r from-brand-cyan to-brand-violet hover:shadow-glow-cyan shrink-0 transition-all"
                    >
                      View Link
                    </Link>
                  )}
                </div>
              ))}
            </div>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}
