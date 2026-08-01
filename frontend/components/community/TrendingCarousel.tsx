import React from 'react';
import { TrendingMetric } from '../../types';
import { Flame, Star, Download, Sparkles, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface Props {
  metrics: TrendingMetric[];
}

export const TrendingCarousel: React.FC<Props> = ({ metrics }) => {
  return (
    <div className="space-y-4 text-left">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-black text-white flex items-center gap-2">
          <Flame className="w-5 h-5 text-rose-500 fill-rose-500" /> Trending Applications Leaderboard
        </h3>
        <span className="text-xs text-text-muted">Real-Time Growth Metrics</span>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none">
        {metrics.map((item, idx) => {
          const app = item.app;
          if (!app) return null;

          return (
            <div
              key={app.id}
              className="w-72 sm:w-80 shrink-0 glass-card p-5 rounded-3xl border border-white/10 space-y-4 hover:border-white/20 transition-all shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-400 font-extrabold text-xs flex items-center justify-center font-mono">
                    #{idx + 1}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> Score {item.trendingScore}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-surface-200 border border-white/15 flex items-center justify-center text-2xl shrink-0">
                    {app.iconUrl}
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-white truncate">{app.title}</h4>
                    <span className="text-[11px] text-text-muted block truncate">{app.developer?.name || 'Developer'}</span>
                  </div>
                </div>

                <p className="text-xs text-text-secondary line-clamp-2">{app.tagline || app.description}</p>
              </div>

              <div className="flex items-center justify-between text-xs pt-3 border-t border-white/5">
                <span className="font-bold text-amber-400 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" /> {app.rating} ★
                </span>

                <Link
                  href={`/app/${app.slug}`}
                  className="px-4 py-1.5 rounded-full text-xs font-bold text-slate-950 bg-gradient-to-r from-brand-cyan to-brand-violet hover:shadow-glow-cyan transition-all"
                >
                  View Details
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
