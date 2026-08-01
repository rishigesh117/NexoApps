import React from 'react';
import { AISearchResult, AppItem } from '../../types';
import { Download, Star, Code2, Layers } from 'lucide-react';
import Link from 'next/link';

interface SearchResultsGridProps {
  result: AISearchResult;
}

export const SearchResultsGrid: React.FC<SearchResultsGridProps> = ({ result }) => {
  if (result.apps.length === 0 && result.developers.length === 0 && result.collections.length === 0) {
    return (
      <div className="glass-panel p-12 rounded-3xl border border-white/10 text-center space-y-3">
        <p className="text-sm font-bold text-white">No exact search matches found.</p>
        <p className="text-xs text-text-muted">Try searching for "Batlytics", "Cricket Scoring", or "AI Utilities".</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-left">
      {/* 1. App Matches */}
      {result.apps.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            Applications ({result.apps.length})
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {result.apps.map((app) => (
              <div
                key={app.id}
                className="glass-card p-5 rounded-3xl border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-surface-200 border border-white/15 flex items-center justify-center text-3xl shrink-0">
                    {app.iconUrl}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-white text-sm leading-tight">{app.title}</h4>
                    <span className="text-[11px] text-brand-cyan font-semibold block">{app.category}</span>
                    <p className="text-xs text-text-secondary line-clamp-2">{app.description}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-white/10 pt-3 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="text-amber-400 font-bold flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400" /> {app.rating}
                    </span>
                    <span className="text-emerald-400 font-mono text-[11px] flex items-center gap-1">
                      <Download className="w-3.5 h-3.5" /> {(app.downloads || 142000).toLocaleString()}
                    </span>
                  </div>

                  <Link
                    href={`/app/${app.slug}`}
                    className="px-4 py-1.5 rounded-full text-xs font-bold text-slate-950 bg-gradient-to-r from-brand-cyan to-brand-violet hover:shadow-glow-cyan transition-all"
                  >
                    View App
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Developer Matches */}
      {result.developers.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-white/10">
          <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
            <Code2 className="w-4 h-4" /> Developer Studios ({result.developers.length})
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.developers.map((dev) => (
              <div key={dev.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-xl shrink-0">
                    🏏
                  </div>
                  <div>
                    <h4 className="font-extrabold text-white">{dev.studioName}</h4>
                    <span className="text-[11px] text-text-muted">@{dev.username} • {dev.totalApps} Published Apps</span>
                  </div>
                </div>

                <Link
                  href={`/developer/${dev.username}`}
                  className="px-4 py-1.5 rounded-full text-xs font-bold text-white bg-white/10 hover:bg-white/20 transition-all shrink-0"
                >
                  View Studio
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
