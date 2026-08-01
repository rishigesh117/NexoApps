import React from 'react';
import { Grid, Download, Eye, Heart, Star, TrendingUp, Award, Flame, Sparkles } from 'lucide-react';

interface AnalyticsCardsProps {
  analytics: {
    summary: {
      totalApps: number;
      publishedApps: number;
      draftApps: number;
      archivedApps: number;
      totalDownloads: number;
      totalViews: number;
      totalFavorites: number;
      totalReviews: number;
      averageRating: number;
      monthlyGrowthPercentage: number;
    };
    highlights?: {
      mostDownloadedApp?: any;
      topRatedApp?: any;
      newestApp?: any;
    };
    monthlyChart?: { month: string; downloads: number; views: number }[];
  };
}

export const AnalyticsCards: React.FC<AnalyticsCardsProps> = ({ analytics }) => {
  const { summary, highlights } = analytics;

  const statCards = [
    {
      label: 'Total Published Apps',
      value: summary.publishedApps.toString(),
      change: `${summary.draftApps} Drafts Pending`,
      icon: <Grid className="w-5 h-5 text-brand-cyan" />,
      border: 'border-brand-cyan/30',
      gradient: 'from-brand-cyan/20 to-brand-blue/20',
    },
    {
      label: 'Total APK Downloads',
      value: summary.totalDownloads.toLocaleString(),
      change: `+${summary.monthlyGrowthPercentage}% Growth`,
      icon: <Download className="w-5 h-5 text-emerald-400" />,
      border: 'border-emerald-500/30',
      gradient: 'from-emerald-500/20 to-teal-500/20',
    },
    {
      label: 'Store Page Views',
      value: summary.totalViews.toLocaleString(),
      change: 'High Traffic',
      icon: <Eye className="w-5 h-5 text-brand-violet" />,
      border: 'border-brand-violet/30',
      gradient: 'from-brand-violet/20 to-purple-500/20',
    },
    {
      label: 'User Favorites',
      value: summary.totalFavorites.toLocaleString(),
      change: 'Saved Apps',
      icon: <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />,
      border: 'border-rose-500/30',
      gradient: 'from-rose-500/20 to-pink-500/20',
    },
    {
      label: 'Average Score',
      value: `${summary.averageRating} ★`,
      change: `${summary.totalReviews} Reviews`,
      icon: <Star className="w-5 h-5 text-amber-400 fill-amber-400" />,
      border: 'border-amber-400/30',
      gradient: 'from-amber-400/20 to-orange-500/20',
    },
  ];

  return (
    <div className="space-y-6 text-left">
      {/* 1. Main Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {statCards.map((card, idx) => (
          <div
            key={idx}
            className={`glass-panel p-5 rounded-3xl border ${card.border} bg-gradient-to-br ${card.gradient} space-y-3 shadow-lg hover:scale-[1.02] transition-all`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-text-secondary">{card.label}</span>
              <div className="p-2 rounded-2xl bg-white/10">{card.icon}</div>
            </div>

            <div className="space-y-1">
              <h4 className="text-2xl font-black text-white tracking-tight">{card.value}</h4>
              <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-400">
                <TrendingUp className="w-3 h-3" />
                <span>{card.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 2. Top App Highlights Row */}
      {highlights && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Most Downloaded */}
          {highlights.mostDownloadedApp && (
            <div className="glass-panel p-5 rounded-3xl border border-white/10 flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <Download className="w-6 h-6" />
              </div>
              <div className="space-y-0.5 text-xs truncate">
                <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider">Most Downloaded</span>
                <h5 className="font-extrabold text-white truncate">{highlights.mostDownloadedApp.title}</h5>
                <p className="text-[11px] text-emerald-400 font-mono font-bold">
                  {(highlights.mostDownloadedApp.downloads || 1850).toLocaleString()} APK downloads
                </p>
              </div>
            </div>
          )}

          {/* Top Rated */}
          {highlights.topRatedApp && (
            <div className="glass-panel p-5 rounded-3xl border border-white/10 flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <Star className="w-6 h-6 fill-amber-400" />
              </div>
              <div className="space-y-0.5 text-xs truncate">
                <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider">Top Rated Application</span>
                <h5 className="font-extrabold text-white truncate">{highlights.topRatedApp.title}</h5>
                <p className="text-[11px] text-amber-300 font-bold">
                  {highlights.topRatedApp.rating || 4.9} ★ rating score
                </p>
              </div>
            </div>
          )}

          {/* Newest Release */}
          {highlights.newestApp && (
            <div className="glass-panel p-5 rounded-3xl border border-white/10 flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-cyan/20 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="space-y-0.5 text-xs truncate">
                <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider">Newest Catalog Release</span>
                <h5 className="font-extrabold text-white truncate">{highlights.newestApp.title}</h5>
                <p className="text-[11px] text-brand-cyan font-mono font-bold">
                  Released {highlights.newestApp.releaseDate || 'Recently'}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
