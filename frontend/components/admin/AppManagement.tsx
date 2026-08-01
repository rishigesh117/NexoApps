import React, { useState } from 'react';
import { AppItem, AppCategory, AppPlatform, AppStatus } from '../../types';
import { adminService } from '../../services/adminService';
import { Grid, Plus, Edit3, Trash2, Award, Flame, CheckCircle2, X } from 'lucide-react';

interface AppManagementProps {
  apps: AppItem[];
  onRefresh: () => void;
}

export const AppManagement: React.FC<AppManagementProps> = ({ apps, onRefresh }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<AppItem | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<AppCategory>('Android Apps');
  const [version, setVersion] = useState('1.0.0');
  const [iconUrl, setIconUrl] = useState('📱');
  const [status, setStatus] = useState<AppStatus>('Published');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isTrending, setIsTrending] = useState(false);

  const openCreateModal = () => {
    setEditingApp(null);
    setTitle('');
    setSlug('');
    setTagline('');
    setDescription('');
    setCategory('Android Apps');
    setVersion('1.0.0');
    setIconUrl('📱');
    setStatus('Published');
    setIsFeatured(false);
    setIsTrending(false);
    setIsModalOpen(true);
  };

  const openEditModal = (app: AppItem) => {
    setEditingApp(app);
    setTitle(app.title);
    setSlug(app.slug);
    setTagline(app.tagline);
    setDescription(app.description);
    setCategory(app.category);
    setVersion(app.version);
    setIconUrl(app.iconUrl);
    setStatus(app.status);
    setIsFeatured(app.isFeatured);
    setIsTrending(app.isTrending || false);
    setIsModalOpen(true);
  };

  const handleDelete = async (appId: string, appTitle: string) => {
    if (confirm(`Are you sure you want to delete application "${appTitle}"?`)) {
      try {
        await adminService.deleteApp(appId);
        onRefresh();
      } catch (err: any) {
        alert(err.message || 'Failed to delete app');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: Partial<AppItem> = {
        title,
        slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        tagline,
        description,
        category,
        version,
        iconUrl,
        status,
        isFeatured,
        isTrending,
        platform: ['Android'],
        developer: {
          name: 'Nexo Platform Developer',
          email: 'developer@nexoapps.com',
        },
      };

      if (editingApp) {
        await adminService.updateApp(editingApp.id, payload);
      } else {
        await adminService.createApp(payload);
      }

      setIsModalOpen(false);
      onRefresh();
    } catch (err: any) {
      alert(err.message || 'Failed to save application');
    }
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-white/10">
        <div>
          <h3 className="text-xl font-black text-white flex items-center gap-2">
            <Grid className="w-5 h-5 text-brand-cyan" /> App Catalog Management
          </h3>
          <p className="text-xs text-text-secondary">
            Publish new applications, manage versions, toggle status, and grant featured badges.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-extrabold text-slate-950 bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet hover:shadow-glow-cyan transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Publish New App</span>
        </button>
      </div>

      {/* Apps Grid */}
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

                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                    app.status === 'Published'
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                  }`}
                >
                  {app.status}
                </span>
              </div>

              <p className="text-xs text-text-secondary line-clamp-2">{app.description}</p>

              <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                <span className="px-2 py-0.5 rounded-full bg-white/5 text-text-muted border border-white/10">
                  {app.category}
                </span>
                {app.isFeatured && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-0.5">
                    <Award className="w-3 h-3" /> Featured
                  </span>
                )}
                {app.isTrending && (
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-0.5">
                    <Flame className="w-3 h-3" /> Trending
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/5">
              <button
                onClick={() => openEditModal(app)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-text-muted hover:text-white transition-all"
                title="Edit Application"
              >
                <Edit3 className="w-4 h-4 text-brand-cyan" />
              </button>
              <button
                onClick={() => handleDelete(app.id, app.title)}
                className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/10 text-text-muted hover:text-rose-400 transition-all"
                title="Delete Application"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-panel w-full max-w-lg p-6 sm:p-8 rounded-3xl border border-white/15 shadow-2xl space-y-5 relative">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">
                {editingApp ? 'Edit Application Properties' : 'Publish New Application'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-text-muted hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-text-secondary font-semibold">Application Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2 text-white focus:border-brand-cyan/50"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-text-secondary font-semibold">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as AppCategory)}
                    className="w-full bg-slate-900 border border-white/10 rounded-2xl px-3 py-2 text-white"
                  >
                    <option value="Android Apps">Android Apps</option>
                    <option value="AI Apps">AI Apps</option>
                    <option value="Utilities">Utilities</option>
                    <option value="College Projects">College Projects</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-text-secondary font-semibold">Version</label>
                  <input
                    type="text"
                    value={version}
                    onChange={(e) => setVersion(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2 text-white"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-text-secondary font-semibold">Tagline</label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2 text-white"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-text-secondary font-semibold">Full Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-3 text-white resize-none"
                  required
                />
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="rounded text-brand-cyan"
                  />
                  <span>Featured Badge</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isTrending}
                    onChange={(e) => setIsTrending(e.target.checked)}
                    className="rounded text-rose-400"
                  />
                  <span>Trending Badge</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-full text-text-muted hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full text-slate-950 font-bold bg-gradient-to-r from-brand-cyan to-brand-violet hover:shadow-glow-cyan"
                >
                  Save App
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
