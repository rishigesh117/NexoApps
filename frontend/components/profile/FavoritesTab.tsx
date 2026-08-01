import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Download, ExternalLink, Trash2, Star, Sparkles } from 'lucide-react';
import { FavoriteItem } from '../../types';
import { favoriteService } from '../../services/favoriteService';
import { FEATURED_BATLYTICS_APP } from '../../services/appService';

export const FavoritesTab: React.FC = () => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    favoriteService.getUserFavorites().then((data) => {
      if (data && data.length > 0) {
        setFavorites(data);
      } else {
        // Default fallback demonstration
        setFavorites([
          {
            id: 'fav-demo-1',
            userId: 'me',
            appId: FEATURED_BATLYTICS_APP.id,
            createdAt: new Date().toISOString(),
            app: FEATURED_BATLYTICS_APP,
          },
        ]);
      }
      setIsLoading(false);
    });
  }, []);

  const handleRemove = async (appSlug: string, favId: string) => {
    setFavorites((prev) => prev.filter((f) => f.id !== favId));
    try {
      await favoriteService.removeFavorite(appSlug);
    } catch {
      // Revert if needed
    }
  };

  if (isLoading) {
    return (
      <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-4 animate-pulse">
        <div className="h-6 w-48 bg-white/10 rounded" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map((n) => (
            <div key={n} className="h-36 bg-white/10 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 text-left">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-extrabold text-white">Favorite Apps & Wishlist</h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
              {favorites.length}
            </span>
          </div>
          <p className="text-xs text-text-secondary">
            Your saved applications for instant re-downloads and updates
          </p>
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="py-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto text-rose-400">
            <Heart className="w-8 h-8" />
          </div>
          <div className="space-y-1 max-w-sm mx-auto">
            <h4 className="text-base font-bold text-white">No Favorite Apps Saved</h4>
            <p className="text-xs text-text-secondary">
              Browse the app catalog and tap the heart icon on any app page to save it to your wishlist.
            </p>
          </div>
          <Link
            href="/apps"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-brand-cyan to-brand-violet hover:shadow-glow-cyan transition-all"
          >
            <span>Explore App Catalog</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence>
            {favorites.map((fav) => {
              const app = fav.app;
              if (!app) return null;

              return (
                <motion.div
                  key={fav.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="glass-card p-5 rounded-2xl border border-white/10 flex flex-col justify-between gap-4 hover:border-white/20 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-surface-200 border border-white/15 flex items-center justify-center text-3xl shrink-0">
                      {app.iconUrl}
                    </div>

                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <Link
                          href={`/app/${app.slug}`}
                          className="text-sm font-extrabold text-white hover:text-brand-cyan truncate transition-colors"
                        >
                          {app.title}
                        </Link>
                        <button
                          onClick={() => handleRemove(app.slug, fav.id)}
                          aria-label="Remove favorite"
                          className="p-1 text-text-muted hover:text-rose-400 transition-colors"
                          title="Remove from favorites"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-xs text-text-secondary line-clamp-1">{app.tagline}</p>

                      <div className="flex items-center gap-3 text-[11px] text-text-muted pt-1">
                        <span className="flex items-center gap-1 font-semibold text-amber-400">
                          <Star className="w-3 h-3 fill-amber-400" />
                          {app.rating}
                        </span>
                        <span>•</span>
                        <span className="text-brand-cyan font-mono">v{app.version}</span>
                        <span>•</span>
                        <span>{app.category}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                    <Link
                      href={`/download/${app.slug}`}
                      className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-violet text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-glow-cyan hover:opacity-95 transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Again</span>
                    </Link>

                    <Link
                      href={`/app/${app.slug}`}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-text-secondary hover:text-white border border-white/10 text-xs font-semibold transition-all"
                      title="View App Details"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
