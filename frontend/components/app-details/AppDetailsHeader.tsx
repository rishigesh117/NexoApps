import React, { useState } from 'react';
import { AppItem } from '../../types';
import { PlatformBadge } from '../PlatformBadge';
import { Star, Download, Share2, Heart, ShieldAlert, Award, Calendar, HardDrive, CheckCircle2, BadgeCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

import { FavoriteButton } from '../reviews/FavoriteButton';

interface AppDetailsHeaderProps {
  app: AppItem;
  onDownloadClick: (e: React.MouseEvent) => void;
  onReportClick: () => void;
  onAuthRequired?: () => void;
}

export const AppDetailsHeader: React.FC<AppDetailsHeaderProps> = ({
  app,
  onDownloadClick,
  onReportClick,
  onAuthRequired,
}) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: app.title,
        text: app.tagline,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 relative overflow-hidden text-left shadow-2xl">
      {/* Radial Background Accent */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-brand-cyan/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
        
        {/* Left App Icon & Metadata */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-surface-200 border border-white/15 flex items-center justify-center text-4xl sm:text-5xl shadow-inner shrink-0 bg-gradient-to-tr from-surface-200 to-surface-100">
            {app.iconUrl}
          </div>

          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {app.title}
              </h1>
              
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30 uppercase tracking-wider">
                {app.category}
              </span>

              {app.isFeatured && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                  <Award className="w-3 h-3" /> Featured
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-brand-cyan font-medium leading-relaxed">
              {app.tagline}
            </p>

            <div className="flex items-center gap-2 text-xs text-text-muted pt-1">
              <span className="flex items-center gap-1 font-semibold text-white">
                {app.developer.name}
              </span>
              <BadgeCheck className="w-4 h-4 text-brand-cyan shrink-0" title="Verified Developer" />
            </div>
          </div>
        </div>

        {/* Right CTA Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <a
            href={app.downloadUrl || '#download'}
            onClick={onDownloadClick}
            className="flex-1 md:flex-none py-3 px-6 rounded-2xl bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet text-slate-950 font-extrabold text-xs shadow-glow-cyan hover:opacity-95 transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download APK ({app.fileSize || app.apkSize || '42 MB'})</span>
          </a>

          <button
            onClick={handleShare}
            className="p-3 rounded-2xl bg-surface-100 hover:bg-surface-200 border border-white/10 text-text-secondary hover:text-white transition-colors"
            title="Share App"
          >
            <Share2 className="w-4 h-4" />
          </button>

          <FavoriteButton
            appSlug={app.slug}
            showText={false}
            size="md"
            onAuthRequired={onAuthRequired}
          />

          <button
            onClick={onReportClick}
            className="p-3 rounded-2xl bg-surface-100 hover:bg-red-500/10 border border-white/10 hover:border-red-500/30 text-text-muted hover:text-red-400 transition-colors"
            title="Report Application"
          >
            <ShieldAlert className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Metrics Row Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10 text-xs">
        <div className="p-3 rounded-2xl bg-surface-100/60 border border-white/5 space-y-1">
          <span className="text-[10px] text-text-muted font-medium uppercase tracking-wider">Rating</span>
          <div className="flex items-center gap-1 font-bold text-white">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{app.rating}</span>
            <span className="text-[10px] text-text-muted font-normal">({app.totalReviews})</span>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-surface-100/60 border border-white/5 space-y-1">
          <span className="text-[10px] text-text-muted font-medium uppercase tracking-wider">Downloads</span>
          <p className="font-bold text-white">{app.downloadsCount.toLocaleString()}+</p>
        </div>

        <div className="p-3 rounded-2xl bg-surface-100/60 border border-white/5 space-y-1">
          <span className="text-[10px] text-text-muted font-medium uppercase tracking-wider">Version</span>
          <p className="font-bold text-brand-cyan">v{app.version}</p>
        </div>

        <div className="p-3 rounded-2xl bg-surface-100/60 border border-white/5 space-y-1">
          <span className="text-[10px] text-text-muted font-medium uppercase tracking-wider">Min Android</span>
          <p className="font-bold text-white">{app.minAndroidVersion || 'Android 8.0+'}</p>
        </div>
      </div>
    </div>
  );
};
