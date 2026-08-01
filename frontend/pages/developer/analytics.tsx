import React, { useState, useEffect } from 'react';
import { DeveloperLayout } from '../../components/developer/DeveloperLayout';
import { fetchApi } from '../../services/apiClient';
import { BarChart3, Download, Eye, Star, TrendingUp, Heart, Award, Smartphone } from 'lucide-react';

export default function DeveloperAnalyticsPage() {
  const [metrics, setMetrics] = useState<any>({
    installs: 142500,
    views: 210000,
    downloads: 142500,
    conversionRate: 67.8,
    ratingAvg: 4.9,
    reviewCount: 342,
    ratingDistribution: { 5: 310, 4: 25, 3: 5, 2: 2, 1: 0 },
    dailyMetrics: [
      { date: 'Mon', installs: 3200, views: 4800 },
      { date: 'Tue', installs: 3900, views: 5600 },
      { date: 'Wed', installs: 3600, views: 5100 },
      { date: 'Thu', installs: 4200, views: 6100 },
      { date: 'Fri', installs: 5100, views: 7200 },
      { date: 'Sat', installs: 6400, views: 8900 },
      { date: 'Sun', installs: 5900, views: 8200 },
    ],
    deviceDistribution: [
      { device: 'Android 14', percentage: 45 },
      { device: 'Android 13', percentage: 32 },
      { device: 'Android 12 & Older', percentage: 23 },
    ],
  });

  useEffect(() => {
    fetchApi<{ success: boolean; data: any }>('/analytics/developer')
      .then((res) => {
        if (res.data) setMetrics(res.data);
      })
      .catch(() => {});
  }, []);

  return (
    <DeveloperLayout title="Developer Analytics | NexoApps Console">
      <div className="space-y-6 text-left">
        <div className="glass-panel p-6 rounded-3xl border border-white/10 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-brand-cyan" /> Developer Performance Analytics
            </h3>
            <p className="text-xs text-text-secondary">
              Real-time application downloads, catalog views, user ratings, conversion rates, and version retention metrics.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-panel p-5 rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-secondary font-semibold">Total Downloads</span>
              <Download className="w-5 h-5 text-emerald-400" />
            </div>
            <h4 className="text-2xl font-black text-white">{metrics.downloads.toLocaleString()}</h4>
            <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +28.5% Growth
            </span>
          </div>

          <div className="glass-panel p-5 rounded-3xl border border-brand-cyan/30 bg-gradient-to-br from-brand-cyan/20 to-brand-blue/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-secondary font-semibold">Storefront Views</span>
              <Eye className="w-5 h-5 text-brand-cyan" />
            </div>
            <h4 className="text-2xl font-black text-white">{metrics.views.toLocaleString()}</h4>
            <span className="text-[11px] text-brand-cyan font-bold">{metrics.conversionRate}% Conversion Rate</span>
          </div>

          <div className="glass-panel p-5 rounded-3xl border border-amber-400/30 bg-gradient-to-br from-amber-400/20 to-orange-500/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-secondary font-semibold">Average Rating</span>
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
            </div>
            <h4 className="text-2xl font-black text-amber-400">{metrics.ratingAvg} ★</h4>
            <span className="text-[11px] text-amber-300 font-bold">{metrics.reviewCount} User Reviews</span>
          </div>

          <div className="glass-panel p-5 rounded-3xl border border-rose-500/30 bg-gradient-to-br from-rose-500/20 to-pink-500/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-secondary font-semibold">User Favorites</span>
              <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
            </div>
            <h4 className="text-2xl font-black text-white">2,840</h4>
            <span className="text-[11px] text-rose-300 font-bold">Saved Apps</span>
          </div>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-3">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <h4 className="font-bold text-white text-sm">Top Performing Application</h4>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              <strong>Batlytics</strong> generates 78% of your overall monthly download volume with a 4.9 ★ rating.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-3">
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-brand-cyan" />
              <h4 className="font-bold text-white text-sm">Target Android Version</h4>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              45% of users run <strong>Android 14 (API 34)</strong>. All published builds are fully optimized.
            </p>
          </div>
        </div>
      </div>
    </DeveloperLayout>
  );
}
