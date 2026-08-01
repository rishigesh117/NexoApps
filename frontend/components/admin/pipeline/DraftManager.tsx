import React, { useState } from 'react';
import { AppItem } from '../../../types';
import { LifecycleBadge } from './LifecycleBadge';
import { FileEdit, Copy, Archive, Trash2, Rocket, Eye, Plus, Search } from 'lucide-react';
import Link from 'next/link';

interface DraftManagerProps {
  apps: AppItem[];
  onPublish: (appId: string) => void;
  onArchive: (appId: string) => void;
  onDelete: (appId: string) => void;
  onDuplicate: (app: AppItem) => void;
}

export const DraftManager: React.FC<DraftManagerProps> = ({
  apps,
  onPublish,
  onArchive,
  onDelete,
  onDuplicate,
}) => {
  const [activeTab, setActiveTab] = useState<'drafts' | 'published' | 'archived'>('published');
  const [searchQuery, setSearchQuery] = useState('');

  const drafts = apps.filter((a) => a.isDraft === true);
  const published = apps.filter((a) => !a.isDraft && !a.isArchived);
  const archived = apps.filter((a) => a.isArchived === true);

  const getActiveList = () => {
    let list: AppItem[] = [];
    if (activeTab === 'drafts') list = drafts;
    else if (activeTab === 'published') list = published;
    else list = archived;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return list.filter((a) => a.title.toLowerCase().includes(q) || a.slug.toLowerCase().includes(q));
    }
    return list;
  };

  const currentList = getActiveList();

  const calculateCompletionPercentage = (app: AppItem): number => {
    let score = 40;
    if (app.iconUrl && app.iconUrl !== '📱') score += 10;
    if (app.bannerUrl) score += 10;
    if (app.screenshots && app.screenshots.length > 0) score += 15;
    if (app.apkFile) score += 15;
    if (app.features && app.features.length > 0) score += 10;
    return Math.min(score, 100);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Top Header & Tabs */}
      <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <FileEdit className="w-5 h-5 text-brand-cyan" /> App Store Draft & Catalog Manager
            </h3>
            <p className="text-xs text-text-secondary">
              Track draft completion percentages, manage version releases, and publish or archive applications.
            </p>
          </div>

          <Link
            href="/admin/upload"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-extrabold text-slate-950 bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet hover:shadow-glow-cyan transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create / Upload App</span>
          </Link>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/5 border border-white/10 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('published')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'published'
                  ? 'bg-gradient-to-r from-brand-cyan/20 to-brand-violet/20 text-white border border-brand-cyan/40'
                  : 'text-text-muted hover:text-white'
              }`}
            >
              Published ({published.length})
            </button>

            <button
              onClick={() => setActiveTab('drafts')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'drafts'
                  ? 'bg-gradient-to-r from-brand-cyan/20 to-brand-violet/20 text-white border border-brand-cyan/40'
                  : 'text-text-muted hover:text-white'
              }`}
            >
              Drafts ({drafts.length})
            </button>

            <button
              onClick={() => setActiveTab('archived')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'archived'
                  ? 'bg-gradient-to-r from-brand-cyan/20 to-brand-violet/20 text-white border border-brand-cyan/40'
                  : 'text-text-muted hover:text-white'
              }`}
            >
              Archived ({archived.length})
            </button>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search catalog..."
              className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-xs text-white placeholder-text-muted focus:outline-none focus:border-brand-cyan/50"
            />
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      {currentList.length === 0 ? (
        <div className="glass-panel p-8 rounded-3xl border border-white/10 text-center py-12 space-y-2">
          <p className="text-xs text-text-muted">No applications found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentList.map((app) => {
            const completion = calculateCompletionPercentage(app);

            return (
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
                        <span className="text-[10px] text-brand-cyan font-mono">v{app.version} (Build #{app.buildNumber || 1})</span>
                      </div>
                    </div>

                    <LifecycleBadge state={app.isDraft ? 'Draft' : app.isArchived ? 'Archived' : 'Published'} />
                  </div>

                  <p className="text-xs text-text-secondary line-clamp-2">{app.tagline || app.description}</p>

                  {/* Metadata Row */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] p-3 rounded-2xl bg-white/5 border border-white/5">
                    <div>
                      <span className="text-[10px] text-text-muted block">Visibility</span>
                      <span className="font-bold text-white">{app.visibility || 'Public'}</span>
                    </div>

                    <div>
                      <span className="text-[10px] text-text-muted block">Last Edited</span>
                      <span className="font-semibold text-text-secondary">{app.lastUpdated}</span>
                    </div>
                  </div>

                  {/* Completion Bar */}
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between font-semibold">
                      <span className="text-text-muted text-[10px]">Wizard Completion</span>
                      <span className="text-brand-cyan font-mono text-[10px] font-bold">{completion}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-brand-cyan to-brand-violet rounded-full"
                        style={{ width: `${completion}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="flex items-center justify-between gap-2 pt-3 border-t border-white/5">
                  <div className="flex items-center gap-1">
                    <Link
                      href={`/app/${app.slug}`}
                      target="_blank"
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-text-muted hover:text-white transition-all"
                      title="View Store Page"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      onClick={() => onDuplicate(app)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-text-muted hover:text-white transition-all"
                      title="Duplicate Application"
                    >
                      <Copy className="w-3.5 h-3.5 text-brand-cyan" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {app.isDraft && (
                      <button
                        onClick={() => onPublish(app.id)}
                        className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-violet text-slate-950 text-[11px] font-black flex items-center gap-1 hover:shadow-glow-cyan transition-all"
                      >
                        <Rocket className="w-3.5 h-3.5" /> Publish
                      </button>
                    )}

                    {!app.isArchived ? (
                      <button
                        onClick={() => onArchive(app.id)}
                        className="p-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 transition-all"
                        title="Archive App"
                      >
                        <Archive className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={() => onPublish(app.id)}
                        className="p-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition-all"
                        title="Unarchive & Publish"
                      >
                        <Rocket className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <button
                      onClick={() => onDelete(app.id)}
                      className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-all"
                      title="Delete App"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
