import React, { useState, useEffect } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { TrendingCarousel } from '../components/community/TrendingCarousel';
import { communityService } from '../services/communityService';
import { TrendingMetric } from '../types';
import { Flame, Star, Download, TrendingUp, Filter } from 'lucide-react';
import Link from 'next/link';

export default function TrendingPage() {
  const [period, setPeriod] = useState<'today' | 'week' | 'month'>('today');
  const [trending, setTrending] = useState<TrendingMetric[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      setIsLoading(true);
      try {
        const data = await communityService.getTrending(period);
        setTrending(data || []);
      } catch {
        setTrending([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrending();
  }, [period]);

  return (
    <>
      <SEOHead
        title="Trending Applications Leaderboard | NexoApps"
        description="Discover the highest trending applications today, this week, and this month on NexoApps."
      />

      <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xl">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
                <Flame className="w-6 h-6 text-rose-500 fill-rose-500" /> Trending Apps Leaderboard
              </h1>
              <p className="text-xs sm:text-sm text-text-secondary">
                Calculated in real-time based on download growth, reviews, ratings, and user favorites.
              </p>
            </div>

            {/* Period Filters */}
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/5 border border-white/10">
              <button
                type="button"
                onClick={() => setPeriod('today')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  period === 'today'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-glow-cyan'
                    : 'text-text-muted hover:text-white'
                }`}
              >
                Today
              </button>

              <button
                type="button"
                onClick={() => setPeriod('week')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  period === 'week'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-glow-cyan'
                    : 'text-text-muted hover:text-white'
                }`}
              >
                This Week
              </button>

              <button
                type="button"
                onClick={() => setPeriod('month')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  period === 'month'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-glow-cyan'
                    : 'text-text-muted hover:text-white'
                }`}
              >
                This Month
              </button>
            </div>
          </div>

          <TrendingCarousel metrics={trending} />

          {/* Detailed Leaderboard Grid */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
            <h3 className="text-base font-bold text-white border-b border-white/10 pb-3">
              Full Ranked Rankings ({period.toUpperCase()})
            </h3>

            <div className="space-y-3">
              {trending.map((item, idx) => {
                const app = item.app;
                if (!app) return null;

                return (
                  <div
                    key={app.id}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs"
                  >
                    <div className="flex items-center gap-4">
                      <span className="w-8 h-8 rounded-2xl bg-rose-500/20 border border-rose-500/30 text-rose-400 font-extrabold text-xs flex items-center justify-center font-mono shrink-0">
                        #{idx + 1}
                      </span>

                      <div className="w-12 h-12 rounded-2xl bg-surface-200 border border-white/15 flex items-center justify-center text-2xl shrink-0">
                        {app.iconUrl}
                      </div>

                      <div>
                        <h4 className="text-sm font-extrabold text-white">{app.title}</h4>
                        <span className="text-[11px] text-text-muted">{app.developer?.name || 'Studio'} • {app.category}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-white/5">
                      <div className="text-right">
                        <span className="text-amber-400 font-bold block">{app.rating} ★ ({app.totalReviews})</span>
                        <span className="text-emerald-400 font-mono text-[10px]">{item.downloads.toLocaleString()} downloads</span>
                      </div>

                      <Link
                        href={`/app/${app.slug}`}
                        className="px-5 py-2 rounded-full text-xs font-bold text-slate-950 bg-gradient-to-r from-brand-cyan to-brand-violet hover:shadow-glow-cyan transition-all shrink-0"
                      >
                        Download APK
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
