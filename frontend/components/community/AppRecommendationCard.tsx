import React from 'react';
import { RecommendationItem } from '../../types';
import { Sparkles, Star, Download, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Props {
  item: RecommendationItem;
}

export const AppRecommendationCard: React.FC<Props> = ({ item }) => {
  const { app, reason, score, similarApps } = item;

  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 text-left hover:border-white/20 transition-all flex flex-col justify-between shadow-xl">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" /> {reason}
          </span>
          <span className="text-[10px] text-emerald-400 font-mono font-bold">{score}% Match</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-surface-200 border border-white/15 flex items-center justify-center text-3xl shrink-0">
            {app.iconUrl}
          </div>
          <div>
            <h4 className="text-base font-extrabold text-white">{app.title}</h4>
            <div className="flex items-center gap-1.5 text-xs text-text-muted">
              <span>{app.developer?.name || 'Studio'}</span>
              <ShieldCheck className="w-3.5 h-3.5 text-brand-cyan" />
            </div>
          </div>
        </div>

        <p className="text-xs text-text-secondary line-clamp-2">{app.tagline || app.description}</p>
      </div>

      <div className="space-y-3 pt-2">
        {similarApps && similarApps.length > 0 && (
          <div className="text-[11px] text-text-muted space-y-1">
            <span className="font-semibold text-white block">Similar Applications:</span>
            <div className="flex items-center gap-2">
              {similarApps.map((sim) => (
                <Link
                  key={sim.id}
                  href={`/app/${sim.slug}`}
                  className="px-2.5 py-1 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:border-brand-cyan/40 transition-all truncate"
                >
                  {sim.title}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
          <span className="font-bold text-amber-400 flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400" /> {app.rating} ★ ({app.totalReviews} reviews)
          </span>

          <Link
            href={`/app/${app.slug}`}
            className="px-5 py-2 rounded-full text-xs font-bold text-slate-950 bg-gradient-to-r from-brand-cyan to-brand-violet hover:shadow-glow-cyan flex items-center gap-1 transition-all"
          >
            <span>Explore App</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
