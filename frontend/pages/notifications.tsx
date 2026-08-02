import React, { useState, useEffect } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { PlatformSidebar } from '../components/platform/PlatformSidebar';
import { getPlatformNotifications } from '../services/notificationService';
import { PlatformNotification } from '../types';
import { Bell, CheckCircle2, Info } from 'lucide-react';
import Link from 'next/link';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<PlatformNotification[]>([]);

  useEffect(() => {
    getPlatformNotifications().then((data) => setNotifications(data)).catch(() => {});
  }, []);

  return (
    <>
      <SEOHead
        title="Notification Center | NexoApps AI OS"
        description="Unified notification center for model deployment alerts, marketplace sales, and agent notifications."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 text-left">
          <PlatformSidebar />

          <div className="flex-1 space-y-8 min-w-0">
            <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
              <h1 className="text-2xl font-black text-white flex items-center gap-2">
                <Bell className="w-6 h-6 text-rose-400" /> Platform Notification Center
              </h1>
              <p className="text-xs text-text-secondary">
                Real-time alerts, agent task completions, model health status, and creator earnings.
              </p>
            </div>

            <div className="space-y-4">
              {notifications.map((n) => (
                <div key={n.id} className="glass-panel p-5 rounded-3xl border border-white/10 flex items-center justify-between gap-4 shadow-2xl">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-cyan/20 text-brand-cyan">
                        {n.module}
                      </span>
                      <h4 className="font-extrabold text-white text-xs">{n.title}</h4>
                    </div>
                    <p className="text-xs text-text-secondary">{n.message}</p>
                  </div>
                  {n.link && (
                    <Link
                      href={n.link}
                      className="px-4 py-1.5 rounded-full text-xs font-bold bg-white/10 hover:bg-white/20 text-white transition-all shrink-0"
                    >
                      View Details
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
