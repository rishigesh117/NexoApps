import React from 'react';
import { DeveloperFollowButton } from '../community/DeveloperFollowButton';
import { DeveloperProfile, AppItem } from '../../types';
import { BadgeCheck, Globe, Mail, Users, Grid, Download, Star, ExternalLink, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

interface DeveloperProfileCardProps {
  profile: DeveloperProfile;
  apps: AppItem[];
}

export const DeveloperProfileCard: React.FC<DeveloperProfileCardProps> = ({ profile, apps }) => {
  return (
    <div className="space-y-8 text-left">
      {/* Banner & Profile Header Showcase */}
      <div className="glass-panel rounded-3xl border border-white/15 overflow-hidden shadow-2xl space-y-6 pb-8">
        <div className="h-48 sm:h-64 w-full relative overflow-hidden bg-gradient-to-r from-brand-cyan/20 via-brand-blue/20 to-brand-violet/20">
          {profile.bannerUrl && (
            <img src={profile.bannerUrl} alt={profile.studioName} className="w-full h-full object-cover" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        </div>

        <div className="px-6 sm:px-8 -mt-20 relative z-10 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-brand-cyan to-brand-violet p-1 shrink-0 shadow-2xl">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-4xl">
                  {profile.logoUrl?.startsWith('http') ? (
                    <img src={profile.logoUrl} alt={profile.studioName} className="w-full h-full object-cover rounded-full" />
                  ) : (
                    profile.logoUrl || '🏏'
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-white">{profile.studioName}</h1>
                  {profile.isVerified && (
                    <BadgeCheck className="w-6 h-6 text-brand-cyan shrink-0" title="Verified Developer Studio" />
                  )}
                </div>
                <p className="text-xs sm:text-sm text-brand-cyan font-semibold">@{profile.username}</p>
                <div className="flex items-center gap-3 text-xs text-text-muted">
                  <span>{profile.country}</span>
                  <span>•</span>
                  <span>Joined NexoApps Developer Ecosystem</span>
                </div>
              </div>
            </div>

            {/* Follow / Support Action Button */}
            <div className="w-full sm:w-auto flex items-center gap-3">
              <DeveloperFollowButton developerId={profile.username || 'batlytics'} />
            </div>
          </div>

          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-3xl">
            {profile.bio || 'Creators of high-performance applications on NexoApps Platform.'}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 text-xs">
            <div>
              <span className="text-[10px] text-text-muted block font-semibold uppercase">Published Apps</span>
              <span className="font-bold text-white text-sm flex items-center gap-1">
                <Grid className="w-4 h-4 text-brand-cyan" /> {apps.length}
              </span>
            </div>

            <div>
              <span className="text-[10px] text-text-muted block font-semibold uppercase">Total Downloads</span>
              <span className="font-bold text-emerald-400 text-sm flex items-center gap-1">
                <Download className="w-4 h-4" /> 18,500+
              </span>
            </div>

            <div>
              <span className="text-[10px] text-text-muted block font-semibold uppercase">Average Score</span>
              <span className="font-bold text-amber-400 text-sm flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400" /> 4.9 ★
              </span>
            </div>

            <div>
              <span className="text-[10px] text-text-muted block font-semibold uppercase">Studio Website</span>
              <a
                href={profile.website}
                target="_blank"
                rel="noreferrer"
                className="font-bold text-brand-cyan hover:underline truncate flex items-center gap-1 text-xs"
              >
                <Globe className="w-3.5 h-3.5" />
                <span className="truncate">{profile.website || 'batlytics.com'}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Published Apps Catalog Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
            <Grid className="w-5 h-5 text-brand-cyan" /> Published Applications by {profile.studioName}
          </h3>
          <span className="text-xs text-text-muted">{apps.length} Applications</span>
        </div>

        {apps.length === 0 ? (
          <p className="text-xs text-text-muted py-6 text-center">No published applications found for this studio.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {apps.map((app) => (
              <div
                key={app.id}
                className="glass-card p-5 rounded-3xl border border-white/10 space-y-4 hover:border-white/20 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-surface-200 border border-white/15 flex items-center justify-center text-2xl shrink-0">
                        {app.iconUrl}
                      </div>
                      <div>
                        <h4 className="text-sm font-extrabold text-white">{app.title}</h4>
                        <span className="text-[10px] text-brand-cyan font-mono">v{app.version}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-text-secondary line-clamp-2">{app.description}</p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs">
                  <span className="font-bold text-amber-400 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" /> {app.rating} ★
                  </span>

                  <Link
                    href={`/app/${app.slug}`}
                    className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-bold text-slate-950 bg-gradient-to-r from-brand-cyan to-brand-violet hover:shadow-glow-cyan transition-all"
                  >
                    <span>View App</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
