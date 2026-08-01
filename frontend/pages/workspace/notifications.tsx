import React, { useState } from 'react';
import { SEOHead } from '../../components/SEOHead';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { OrganizationSidebar } from '../../components/workspace/OrganizationSidebar';
import { Bell, Check, Users, FolderGit2, ShieldAlert } from 'lucide-react';

export default function WorkspaceNotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'New Team Member Invited',
      message: 'qa.lead@batlytics.com was invited as a Reviewer by Rishigesh.',
      time: '10 minutes ago',
      read: false,
    },
    {
      id: 'notif-2',
      title: 'Project Status Updated',
      message: 'Project "Batlytics Android Engine" status changed to Active.',
      time: '2 hours ago',
      read: true,
    },
    {
      id: 'notif-3',
      title: 'Production Build Uploaded',
      message: 'Signed APK (v1.0.0-rc1) uploaded to Owner Upload Portal.',
      time: '1 day ago',
      read: true,
    },
  ]);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <>
      <SEOHead
        title="Organization Notifications | NexoApps Workspace"
        description="Team alerts, role assignments, build upload notifications, and project updates."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 text-left">
          <OrganizationSidebar />

          <div className="flex-1 space-y-8 min-w-0">
            <div className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xl">
              <div>
                <h1 className="text-2xl font-black text-white flex items-center gap-2">
                  <Bell className="w-6 h-6 text-rose-400" /> Organization Notifications
                </h1>
                <p className="text-xs text-text-secondary mt-1">
                  Team invitations, role updates, project build events, and security alerts.
                </p>
              </div>

              <button
                type="button"
                onClick={markAllRead}
                className="px-4 py-2 rounded-full text-xs font-bold text-white bg-white/10 hover:bg-white/20 transition-all shrink-0"
              >
                Mark All as Read
              </button>
            </div>

            <div className="space-y-3">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={`glass-panel p-5 rounded-3xl border transition-all flex items-start justify-between gap-4 ${
                    !n.read ? 'border-brand-cyan/40 bg-brand-cyan/5' : 'border-white/10'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-white text-sm">{n.title}</h4>
                      {!n.read && (
                        <span className="w-2 h-2 rounded-full bg-brand-cyan" />
                      )}
                    </div>
                    <p className="text-xs text-text-secondary">{n.message}</p>
                    <span className="text-[10px] text-text-muted font-mono block">{n.time}</span>
                  </div>
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
