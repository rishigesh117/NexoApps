import React, { useState, useEffect } from 'react';
import { DeveloperLayout } from '../../components/developer/DeveloperLayout';
import { developerService } from '../../services/developerService';
import { AppItem, DeveloperWorkspaceStats } from '../../types';
import { Grid, Download, Eye, Star, TrendingUp, Sparkles, Plus, Clock, Rocket, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function DeveloperDashboardPage() {
  const [stats, setStats] = useState<DeveloperWorkspaceStats | null>(null);
  const [myApps, setMyApps] = useState<AppItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const res = await developerService.getDashboard();
      setStats(res.stats);
      setMyApps(res.myApps || []);
    } catch {
      // Fallback state
      setStats({
        myAppsCount: 3,
        draftAppsCount: 1,
        publishedAppsCount: 2,
        archivedAppsCount: 0,
        totalDownloads: 18500,
        totalViews: 54000,
        totalReviews: 124,
        averageRating: 4.9,
        monthlyGrowthPercentage: 28.5,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <DeveloperLayout title="Developer Workspace | NexoApps Console">
      <div className="space-y-6 text-left">
        
        {/* Header Hero */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xl relative overflow-hidden">
          <div className="space-y-1 relative z-10">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-brand-cyan" /> Studio Developer Workspace
            </h1>
            <p className="text-xs sm:text-sm text-text-secondary max-w-xl">
              Track download analytics, publish app updates, manage submission review queues, and view performance metrics.
            </p>
          </div>

          <Link
            href="/developer/apps"
            className="px-6 py-3 rounded-full text-xs font-black text-slate-950 bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet hover:shadow-glow-cyan flex items-center gap-2 transition-all relative z-10"
          >
            <Plus className="w-4 h-4" />
            <span>Submit / Update App</span>
          </Link>
        </div>

        {/* Developer Workspace Stats Grid */}
        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-panel p-5 rounded-3xl border border-brand-cyan/30 bg-gradient-to-br from-brand-cyan/15 to-brand-blue/15 space-y-2">
              <span className="text-xs text-text-secondary font-semibold">Published Applications</span>
              <h3 className="text-2xl font-black text-white">{stats.publishedAppsCount} Apps</h3>
              <p className="text-[11px] text-brand-cyan font-bold">{stats.draftAppsCount} Draft Pending</p>
            </div>

            <div className="glass-panel p-5 rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/15 to-teal-500/15 space-y-2">
              <span className="text-xs text-text-secondary font-semibold">Total Downloads</span>
              <h3 className="text-2xl font-black text-white">{stats.totalDownloads.toLocaleString()}</h3>
              <p className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +{stats.monthlyGrowthPercentage}% this month
              </p>
            </div>

            <div className="glass-panel p-5 rounded-3xl border border-brand-violet/30 bg-gradient-to-br from-brand-violet/15 to-purple-500/15 space-y-2">
              <span className="text-xs text-text-secondary font-semibold">Catalog Page Views</span>
              <h3 className="text-2xl font-black text-white">{stats.totalViews.toLocaleString()}</h3>
              <p className="text-[11px] text-brand-violet font-bold">High Engagement</p>
            </div>

            <div className="glass-panel p-5 rounded-3xl border border-amber-400/30 bg-gradient-to-br from-amber-400/15 to-orange-500/15 space-y-2">
              <span className="text-xs text-text-secondary font-semibold">Average App Score</span>
              <h3 className="text-2xl font-black text-amber-400">{stats.averageRating} ★</h3>
              <p className="text-[11px] text-amber-300 font-bold">{stats.totalReviews} Total Reviews</p>
            </div>
          </div>
        )}

        {/* My Applications Showcase */}
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <Grid className="w-5 h-5 text-brand-cyan" /> My Registered Applications
            </h3>
            <span className="text-xs text-text-muted">{myApps.length} Apps</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myApps.slice(0, 6).map((app) => (
              <div
                key={app.id}
                className="glass-card p-5 rounded-3xl border border-white/10 space-y-3 hover:border-white/20 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-surface-200 border border-white/15 flex items-center justify-center text-2xl shrink-0">
                    {app.iconUrl}
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-white">{app.title}</h4>
                    <span className="text-[10px] text-brand-cyan font-mono">v{app.version}</span>
                  </div>
                </div>

                <p className="text-xs text-text-secondary line-clamp-2">{app.tagline || app.description}</p>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-white/5">
                  <span className="text-emerald-400 font-bold">{app.downloads || 1850} downloads</span>
                  <Link href={`/app/${app.slug}`} className="text-brand-cyan hover:underline font-semibold text-[11px]">
                    View Storefront →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DeveloperLayout>
  );
}
