import React, { useState } from 'react';
import { UploadWizardState } from '../../../types';
import { adminService } from '../../../services/adminService';
import { Rocket, Save, RefreshCw, Trash2, Archive, CheckCircle2, Award, Flame } from 'lucide-react';
import { useRouter } from 'next/router';

interface Step8Props {
  formData: UploadWizardState;
  onChange: (field: keyof UploadWizardState, value: any) => void;
  onBack: () => void;
}

export const Step8Publish: React.FC<Step8Props> = ({ formData, onChange, onBack }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleAction = async (action: 'draft' | 'publish' | 'archive' | 'delete') => {
    setIsSubmitting(true);
    setSuccessMessage(null);

    try {
      if (action === 'delete') {
        if (confirm(`Are you sure you want to delete application "${formData.title}"?`)) {
          // Perform delete call
          await adminService.deleteApp(formData.slug);
          alert('Application deleted cleanly.');
          router.push('/admin/apps');
        }
        setIsSubmitting(false);
        return;
      }

      const payload = {
        ...formData,
        isDraft: action === 'draft',
        isArchived: action === 'archive',
        status: action === 'draft' ? ('Coming Soon' as const) : action === 'archive' ? ('Maintenance' as const) : ('Published' as const),
      };

      const result = await adminService.uploadApp(payload);

      setSuccessMessage(
        action === 'draft'
          ? 'Draft application saved successfully!'
          : action === 'archive'
          ? 'Application archived successfully.'
          : 'Application uploaded & published to NexoApps Store live!'
      );

      setTimeout(() => {
        router.push('/admin/apps');
      }, 1500);
    } catch (err: any) {
      alert(err.message || 'Operation failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 text-left">
      <div className="border-b border-white/10 pb-4">
        <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
          <Rocket className="w-5 h-5 text-brand-cyan" /> Step 8: Final Publishing & App Lifecycle Actions
        </h3>
        <p className="text-xs text-text-secondary">
          Choose publishing lifecycle status, grant curation badges, or archive/delete applications.
        </p>
      </div>

      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Badges & Curation Controls */}
      <div className="p-5 rounded-3xl bg-white/5 border border-white/10 space-y-3 text-xs">
        <span className="font-bold text-white block">Promotional Badges & Visibility</span>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <label className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2.5 cursor-pointer hover:bg-white/10 transition-all">
            <input
              type="checkbox"
              checked={formData.isFeatured}
              onChange={(e) => onChange('isFeatured', e.target.checked)}
              className="rounded text-brand-cyan"
            />
            <span className="font-bold text-amber-300 flex items-center gap-1">
              <Award className="w-4 h-4" /> Featured Badge
            </span>
          </label>

          <label className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2.5 cursor-pointer hover:bg-white/10 transition-all">
            <input
              type="checkbox"
              checked={formData.isTrending}
              onChange={(e) => onChange('isTrending', e.target.checked)}
              className="rounded text-rose-400"
            />
            <span className="font-bold text-rose-300 flex items-center gap-1">
              <Flame className="w-4 h-4" /> Trending Badge
            </span>
          </label>

          <label className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2.5 cursor-pointer hover:bg-white/10 transition-all">
            <input
              type="checkbox"
              checked={formData.isEditorsChoice}
              onChange={(e) => onChange('isEditorsChoice', e.target.checked)}
              className="rounded text-brand-violet"
            />
            <span className="font-bold text-brand-violet flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Editor's Choice
            </span>
          </label>
        </div>
      </div>

      {/* Action Buttons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
        {/* 1. Save Draft */}
        <button
          type="button"
          disabled={isSubmitting}
          onClick={() => handleAction('draft')}
          className="p-4 rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-bold text-xs flex flex-col items-center gap-2 transition-all"
        >
          <Save className="w-5 h-5 text-brand-cyan" />
          <span>Save Draft</span>
        </button>

        {/* 2. Publish Live */}
        <button
          type="button"
          disabled={isSubmitting}
          onClick={() => handleAction('publish')}
          className="p-4 rounded-2xl border border-brand-cyan/40 bg-gradient-to-r from-brand-cyan to-brand-violet hover:shadow-glow-cyan text-slate-950 font-black text-xs flex flex-col items-center gap-2 transition-all"
        >
          <Rocket className="w-5 h-5" />
          <span>Publish App Live</span>
        </button>

        {/* 3. Archive App */}
        <button
          type="button"
          disabled={isSubmitting}
          onClick={() => handleAction('archive')}
          className="p-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-bold text-xs flex flex-col items-center gap-2 transition-all"
        >
          <Archive className="w-5 h-5" />
          <span>Archive App</span>
        </button>

        {/* 4. Delete App */}
        <button
          type="button"
          disabled={isSubmitting}
          onClick={() => handleAction('delete')}
          className="p-4 rounded-2xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-bold text-xs flex flex-col items-center gap-2 transition-all"
        >
          <Trash2 className="w-5 h-5" />
          <span>Delete App</span>
        </button>
      </div>

      {/* Footer Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2.5 rounded-full text-xs font-semibold text-text-secondary hover:text-white bg-white/5 border border-white/10"
        >
          ← Back to Preview
        </button>
      </div>
    </div>
  );
};
