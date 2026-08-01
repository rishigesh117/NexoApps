import React from 'react';
import { Users, Grid, Download, Star, Code2, TrendingUp } from 'lucide-react';
import { AdminDashboardStats } from '../../types';

interface DashboardStatsProps {
  stats: AdminDashboardStats;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  const cards = [
    {
      title: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      change: '+14% this week',
      icon: <Users className="w-5 h-5 text-brand-cyan" />,
      gradient: 'from-brand-cyan/20 to-brand-blue/20',
      border: 'border-brand-cyan/30',
    },
    {
      title: 'Published Apps',
      value: stats.totalApps.toString(),
      change: '+2 new releases',
      icon: <Grid className="w-5 h-5 text-brand-violet" />,
      gradient: 'from-brand-violet/20 to-purple-500/20',
      border: 'border-brand-violet/30',
    },
    {
      title: 'APK Downloads',
      value: stats.totalDownloads.toLocaleString(),
      change: '+28% growth',
      icon: <Download className="w-5 h-5 text-emerald-400" />,
      gradient: 'from-emerald-500/20 to-teal-500/20',
      border: 'border-emerald-500/30',
    },
    {
      title: 'Total Reviews',
      value: stats.totalReviews.toString(),
      change: `Avg Score: ${stats.averageRating} ★`,
      icon: <Star className="w-5 h-5 text-amber-400 fill-amber-400" />,
      gradient: 'from-amber-400/20 to-orange-500/20',
      border: 'border-amber-400/30',
    },
    {
      title: 'Active Developers',
      value: stats.activeDevelopers.toString(),
      change: 'Batlytics & Nexo AI',
      icon: <Code2 className="w-5 h-5 text-rose-400" />,
      gradient: 'from-rose-500/20 to-pink-500/20',
      border: 'border-rose-500/30',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className={`glass-panel p-5 rounded-3xl border ${card.border} bg-gradient-to-br ${card.gradient} space-y-3 shadow-lg text-left hover:scale-[1.02] transition-all`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-text-secondary">{card.title}</span>
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
  );
};
