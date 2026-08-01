import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AppItem } from '../types';
import { PlatformBadge } from './PlatformBadge';
import { Star, Download, Eye, Heart, Share2, Award, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AppCardProps {
  app: AppItem;
  onOpenModal?: (app: AppItem) => void;
}

export const AppCard: React.FC<AppCardProps> = ({ app, onOpenModal }) => {
  const { isAuthenticated } = useAuth();
  const [isFavorited, setIsFavorited] = useState(false);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: app.title,
        text: app.tagline,
        url: window.location.origin + `/app/${app.slug}`,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.origin + `/app/${app.slug}`);
      alert('App link copied to clipboard!');
    }
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.25 }}
      className="glass-panel rounded-3xl p-5 sm:p-6 border border-white/10 flex flex-col justify-between h-full relative group shadow-xl hover:border-brand-cyan/40 hover:shadow-glow-cyan transition-all overflow-hidden text-left"
    >
      {/* Background Subtle Radial Glow on Hover */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-brand-cyan/10 rounded-full blur-2xl group-hover:bg-brand-cyan/20 transition-all pointer-events-none" />

      <div>
        {/* Header: Icon, Badges & Actions */}
        <div className="flex items-start justify-between gap-3 mb-4">
          
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-surface-200 border border-white/10 flex items-center justify-center text-3xl shadow-inner shrink-0 group-hover:scale-105 transition-transform">
              {app.iconUrl}
            </div>
            {app.isFeatured && (
              <span className="absolute -top-1.5 -right-1.5 p-1 bg-amber-500 text-slate-950 rounded-lg shadow-md" title="Featured App">
                <Award className="w-3 h-3" />
              </span>
            )}
          </div>

          <div className="flex flex-col items-end gap-1.5">
            <span className="text-[10px] font-bold text-brand-cyan bg-brand-cyan/10 px-2.5 py-0.5 rounded-full border border-brand-cyan/30 tracking-wide uppercase">
              {app.category}
            </span>
            
            <div className="flex items-center gap-1">
              <button
                onClick={handleFavorite}
                className={`p-1.5 rounded-lg border transition-colors ${
                  isFavorited
                    ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                    : 'bg-surface-200/60 text-text-muted hover:text-white border-white/5'
                }`}
                title="Save to Favorites"
              >
                <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-rose-400' : ''}`} />
              </button>

              <button
                onClick={handleShare}
                className="p-1.5 rounded-lg bg-surface-200/60 text-text-muted hover:text-white border border-white/5 transition-colors"
                title="Share App"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Title & Tagline */}
        <Link href={`/app/${app.slug}`}>
          <h3 className="font-display font-bold text-lg text-white mb-1.5 group-hover:text-brand-cyan transition-colors leading-tight">
            {app.title}
          </h3>
        </Link>

        <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed mb-4 font-normal">
          {app.tagline}
        </p>

        {/* Platform Badges */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {app.platform.map((plat, idx) => (
            <PlatformBadge key={idx} platform={plat} size="sm" />
          ))}
        </div>
      </div>

      {/* Meta Bar & CTA Buttons */}
      <div className="pt-4 border-t border-white/10 space-y-3 mt-auto">
        
        <div className="flex items-center justify-between text-xs text-text-muted">
          <div className="flex items-center gap-1 font-bold text-white">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />
            <span>{app.rating}</span>
            <span className="text-[10px] text-text-muted font-normal">({app.totalReviews})</span>
          </div>

          <span className="text-[11px] font-medium">
            {app.downloadsCount > 0 ? `${app.downloadsCount.toLocaleString()}+ dls` : app.status}
          </span>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <Link
            href={`/app/${app.slug}`}
            className="flex-1 py-2.5 px-3 rounded-xl bg-surface-200 hover:bg-surface-100 border border-white/10 text-white text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5 text-brand-cyan" />
            <span>View Details</span>
          </Link>

          <Link
            href={isAuthenticated ? `/download/${app.slug}` : `/login?returnUrl=/download/${app.slug}`}
            className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue hover:opacity-95 text-slate-950 font-extrabold text-xs shadow-glow-cyan transition-all flex items-center justify-center gap-1"
            title="Download APK"
          >
            <Download className="w-3.5 h-3.5" />
            <span>APK</span>
          </Link>
        </div>

      </div>
    </motion.div>
  );
};
