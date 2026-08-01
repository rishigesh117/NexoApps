import React from 'react';
import { UploadWizardState, AppCategory } from '../../../types';
import { FileText, Sparkles, Tag, Layers, Calendar, HardDrive } from 'lucide-react';

interface Step1Props {
  formData: UploadWizardState;
  onChange: (field: keyof UploadWizardState, value: any) => void;
  onNext: () => void;
}

const CATEGORIES: AppCategory[] = [
  'Android Apps',
  'AI Apps',
  'Utilities',
  'College Projects',
  'Sports',
  'Education',
  'Games',
  'Productivity',
  'Future Products',
];

export const Step1BasicInfo: React.FC<Step1Props> = ({ formData, onChange, onNext }) => {
  const handleTitleChange = (val: string) => {
    onChange('title', val);
    const generatedSlug = val.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const generatedPackage = `com.nexoapps.${generatedSlug.replace(/-/g, '_')}`;
    if (!formData.slug || formData.slug === '') {
      onChange('slug', generatedSlug);
    }
    if (!formData.packageName || formData.packageName === '') {
      onChange('packageName', generatedPackage);
    }
  };

  const handleTagsChange = (rawTags: string) => {
    const list = rawTags.split(',').map((t) => t.trim()).filter(Boolean);
    onChange('tags', list);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.slug) {
      alert('App Name and Slug are required');
      return;
    }
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 text-left">
      <div className="border-b border-white/10 pb-4">
        <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-brand-cyan" /> Step 1: Basic Information
        </h3>
        <p className="text-xs text-text-secondary">
          Enter core metadata, package naming, categories, and versioning numbers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        
        {/* App Name */}
        <div className="space-y-1 md:col-span-2">
          <label className="text-text-secondary font-semibold flex items-center gap-1">
            Application Title <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="e.g. Batlytics Scorebook"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-white placeholder-text-muted focus:border-brand-cyan/50 focus:outline-none"
            required
          />
        </div>

        {/* Package Name */}
        <div className="space-y-1">
          <label className="text-text-secondary font-semibold">
            Android Package Name <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            value={formData.packageName}
            onChange={(e) => onChange('packageName', e.target.value)}
            placeholder="com.nexoapps.batlytics"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-white font-mono text-xs focus:border-brand-cyan/50"
            required
          />
        </div>

        {/* Slug */}
        <div className="space-y-1">
          <label className="text-text-secondary font-semibold">
            URL Slug (Auto Generated) <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => onChange('slug', e.target.value)}
            placeholder="batlytics-cricket-scoring"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-white font-mono text-xs focus:border-brand-cyan/50"
            required
          />
        </div>

        {/* Tagline */}
        <div className="space-y-1 md:col-span-2">
          <label className="text-text-secondary font-semibold">Short Tagline</label>
          <input
            type="text"
            value={formData.tagline}
            onChange={(e) => onChange('tagline', e.target.value)}
            placeholder="Real-Time Cricket Scoring & High-Precision Analytics Engine"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-white focus:border-brand-cyan/50"
            required
          />
        </div>

        {/* Description */}
        <div className="space-y-1 md:col-span-2">
          <label className="text-text-secondary font-semibold">Full Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => onChange('description', e.target.value)}
            rows={4}
            placeholder="Comprehensive description of feature set, target audience, and usage guide..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-brand-cyan/50 resize-none"
            required
          />
        </div>

        {/* Category */}
        <div className="space-y-1">
          <label className="text-text-secondary font-semibold">Category</label>
          <select
            value={formData.category}
            onChange={(e) => onChange('category', e.target.value as AppCategory)}
            className="w-full bg-slate-900 border border-white/10 rounded-2xl px-4 py-2.5 text-white"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Tags */}
        <div className="space-y-1">
          <label className="text-text-secondary font-semibold">Tags (Comma Separated)</label>
          <input
            type="text"
            value={formData.tags.join(', ')}
            onChange={(e) => handleTagsChange(e.target.value)}
            placeholder="Cricket, Sports, Analytics, PDF Export"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-white focus:border-brand-cyan/50"
          />
        </div>

        {/* Version & Build Number */}
        <div className="space-y-1">
          <label className="text-text-secondary font-semibold">Version Name</label>
          <input
            type="text"
            value={formData.version}
            onChange={(e) => onChange('version', e.target.value)}
            placeholder="1.0.0"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-white font-mono focus:border-brand-cyan/50"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-text-secondary font-semibold">Build Number</label>
          <input
            type="number"
            value={formData.buildNumber}
            onChange={(e) => onChange('buildNumber', parseInt(e.target.value) || 1)}
            placeholder="1"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-white font-mono focus:border-brand-cyan/50"
            required
          />
        </div>

        {/* File Size */}
        <div className="space-y-1">
          <label className="text-text-secondary font-semibold">APK File Size</label>
          <input
            type="text"
            value={formData.fileSize}
            onChange={(e) => onChange('fileSize', e.target.value)}
            placeholder="24.5 MB"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-white focus:border-brand-cyan/50"
          />
        </div>

        {/* Release Date */}
        <div className="space-y-1">
          <label className="text-text-secondary font-semibold">Release Date</label>
          <input
            type="date"
            value={formData.releaseDate}
            onChange={(e) => onChange('releaseDate', e.target.value)}
            className="w-full bg-slate-900 border border-white/10 rounded-2xl px-4 py-2.5 text-white"
          />
        </div>
      </div>

      <div className="flex items-center justify-end pt-4 border-t border-white/10">
        <button
          type="submit"
          className="px-6 py-2.5 rounded-full text-slate-950 font-bold bg-gradient-to-r from-brand-cyan to-brand-violet hover:shadow-glow-cyan transition-all"
        >
          Next: Media Upload →
        </button>
      </div>
    </form>
  );
};
