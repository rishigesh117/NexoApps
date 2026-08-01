import React from 'react';
import { User, BadgeCheck, Globe, Github, Mail, AppWindow } from 'lucide-react';
import { AppItem } from '../../types';
import { AppCard } from '../AppCard';

interface DeveloperSectionProps {
  app: AppItem;
  relatedApps: AppItem[];
}

export const DeveloperSection: React.FC<DeveloperSectionProps> = ({ app, relatedApps }) => {
  return (
    <div className="space-y-8 text-left">
      
      {/* Developer Profile Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-surface-200 border border-white/10 flex items-center justify-center text-brand-cyan">
              <User className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-lg font-bold text-white">{app.developer.name}</h3>
                <BadgeCheck className="w-4 h-4 text-brand-cyan shrink-0" title="Verified Developer" />
              </div>
              <p className="text-xs text-text-muted">{app.developer.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {app.developer.website && (
              <a
                href={app.developer.website}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-xl bg-surface-100 hover:bg-surface-200 border border-white/10 text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <Globe className="w-3.5 h-3.5 text-brand-cyan" /> Website
              </a>
            )}
            <a
              href={`mailto:${app.developer.email}`}
              className="px-3.5 py-2 rounded-xl bg-surface-100 hover:bg-surface-200 border border-white/10 text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5 text-brand-cyan" /> Contact
            </a>
          </div>
        </div>

        <p className="text-xs text-text-secondary leading-relaxed pt-2 border-t border-white/10">
          NexoApps Core Engineering Team specializing in high-performance Android mobile engines, fullstack React/Next.js platforms, and offline-first application architectures.
        </p>
      </div>

      {/* More Apps by Developer / Related Apps */}
      {relatedApps.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <AppWindow className="w-5 h-5 text-brand-cyan" /> More Applications You May Like
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedApps.map((relApp) => (
              <AppCard key={relApp.id || relApp.slug} app={relApp} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
