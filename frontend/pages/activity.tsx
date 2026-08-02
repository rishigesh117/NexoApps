import React, { useState, useEffect } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { PlatformSidebar } from '../components/platform/PlatformSidebar';
import { getActivityFeed } from '../services/activityService';
import { ActivityFeedItem } from '../types';
import { Activity, Clock } from 'lucide-react';

export default function ActivityTimelinePage() {
  const [feed, setFeed] = useState<ActivityFeedItem[]>([]);

  useEffect(() => {
    getActivityFeed().then((data) => setFeed(data)).catch(() => {});
  }, []);

  return (
    <>
      <SEOHead
        title="Cross-Module Activity Timeline | NexoApps AI OS"
        description="Live audit trail of AI Builder exports, Agent tasks, Model deployments, and Marketplace transactions."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 text-left">
          <PlatformSidebar />

          <div className="flex-1 space-y-8 min-w-0">
            <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-2">
              <h1 className="text-2xl font-black text-white flex items-center gap-2">
                <Activity className="w-6 h-6 text-amber-400" /> Platform Activity Feed & Audit Timeline
              </h1>
              <p className="text-xs text-text-secondary">
                Unified audit stream tracking events across AI Builder, Autonomous Agents, Deployments, and Marketplace.
              </p>
            </div>

            <div className="space-y-4">
              {feed.map((act) => (
                <div key={act.id} className="glass-panel p-5 rounded-3xl border border-white/10 flex items-center justify-between gap-4 shadow-2xl">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                        {act.module}
                      </span>
                      <h4 className="font-extrabold text-white text-xs">{act.action}</h4>
                    </div>
                    <p className="text-xs text-text-secondary">{act.description}</p>
                  </div>
                  <span className="text-[10px] font-mono text-text-muted shrink-0 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-brand-cyan" /> {new Date(act.createdAt).toLocaleTimeString()}
                  </span>
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
