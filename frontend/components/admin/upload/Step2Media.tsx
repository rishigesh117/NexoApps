import React, { useState } from 'react';
import { UploadWizardState } from '../../../types';
import { Image as ImageIcon, UploadCloud, X, Plus, CheckCircle2, AlertCircle } from 'lucide-react';

interface Step2Props {
  formData: UploadWizardState;
  onChange: (field: keyof UploadWizardState, value: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step2Media: React.FC<Step2Props> = ({
  formData,
  onChange,
  onNext,
  onBack,
}) => {
  const [newScreenshotUrl, setNewScreenshotUrl] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const validateImageUrl = (url: string): boolean => {
    if (!url || !url.trim()) return false;
    const lower = url.toLowerCase();
    const isSvgOrEmoji = lower.startsWith('data:') || url.length < 5;
    const isHttp = lower.startsWith('http://') || lower.startsWith('https://');
    const isExtensionValid = lower.endsWith('.png') || lower.endsWith('.jpg') || lower.endsWith('.jpeg') || lower.endsWith('.webp');
    return isHttp || isSvgOrEmoji || isExtensionValid;
  };

  const handleAddScreenshot = () => {
    if (!newScreenshotUrl.trim()) return;
    onChange('screenshots', [...formData.screenshots, newScreenshotUrl.trim()]);
    setNewScreenshotUrl('');
  };

  const handleRemoveScreenshot = (index: number) => {
    const list = [...formData.screenshots];
    list.splice(index, 1);
    onChange('screenshots', list);
  };

  const sampleIcons = ['🏏', '🤖', '⚡', '📊', '🛡️', '🚀', '🎨', '🔥'];

  const sampleBanners = [
    'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1200&auto=format&fit=crop',
  ];

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 text-left">
      <div className="border-b border-white/10 pb-4">
        <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-brand-cyan" /> Step 2: Media Assets & Screenshots
        </h3>
        <p className="text-xs text-text-secondary">
          Upload App Icon, Banner Image, Cover Image, and unlimited screenshots (PNG, JPG, WEBP).
        </p>
      </div>

      {validationError && (
        <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      {/* 1. App Icon Selection / Drag & Drop */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-white block">Application Icon (Emoji / Vector / PNG)</label>

        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-surface-200 border border-white/15 flex items-center justify-center text-3xl shrink-0 shadow-lg">
            {formData.iconUrl.startsWith('http') ? (
              <img src={formData.iconUrl} alt="Icon" className="w-full h-full object-cover rounded-2xl" />
            ) : (
              formData.iconUrl || '📱'
            )}
          </div>

          <div className="flex-1 space-y-2">
            <input
              type="text"
              value={formData.iconUrl}
              onChange={(e) => onChange('iconUrl', e.target.value)}
              placeholder="Paste image URL or emoji icon..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2 text-xs text-white"
            />

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-text-muted">Quick Presets:</span>
              {sampleIcons.map((ic) => (
                <button
                  key={ic}
                  type="button"
                  onClick={() => onChange('iconUrl', ic)}
                  className="w-7 h-7 rounded-xl bg-white/5 hover:bg-white/15 text-xs flex items-center justify-center transition-all"
                >
                  {ic}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Banner & Cover Image */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="space-y-2">
          <label className="font-bold text-white block">Header Banner Image URL</label>
          <input
            type="text"
            value={formData.bannerUrl}
            onChange={(e) => onChange('bannerUrl', e.target.value)}
            placeholder="https://images.unsplash.com/..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-white"
          />
          {formData.bannerUrl && (
            <div className="h-28 rounded-2xl overflow-hidden border border-white/10">
              <img src={formData.bannerUrl} alt="Banner Preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="font-bold text-white block">Cover Showcase Image URL</label>
          <input
            type="text"
            value={formData.coverImage}
            onChange={(e) => onChange('coverImage', e.target.value)}
            placeholder="https://images.unsplash.com/..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-white"
          />
          {formData.coverImage && (
            <div className="h-28 rounded-2xl overflow-hidden border border-white/10">
              <img src={formData.coverImage} alt="Cover Preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </div>

      {/* 3. Unlimited Screenshots Section */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-white">App Screenshots ({formData.screenshots.length} Added)</label>
          <span className="text-[11px] text-text-muted">PNG, JPG, WEBP formats supported</span>
        </div>

        {/* Add Screenshot Field */}
        <div className="flex gap-2 text-xs">
          <input
            type="text"
            value={newScreenshotUrl}
            onChange={(e) => setNewScreenshotUrl(e.target.value)}
            placeholder="Paste screenshot URL (e.g. https://images.unsplash.com/...)"
            className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-2 text-white"
          />
          <button
            type="button"
            onClick={handleAddScreenshot}
            className="px-4 py-2 rounded-2xl font-bold bg-brand-cyan/20 text-brand-cyan hover:bg-brand-cyan/30 flex items-center gap-1 transition-all"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>

        {/* Screenshots Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
          {formData.screenshots.map((url, idx) => (
            <div key={idx} className="relative group rounded-2xl overflow-hidden border border-white/10 aspect-video bg-black/40">
              <img src={url} alt={`Screenshot ${idx + 1}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => handleRemoveScreenshot(idx)}
                className="absolute top-1.5 right-1.5 p-1 rounded-full bg-rose-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                title="Remove Screenshot"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2.5 rounded-full text-xs font-semibold text-text-secondary hover:text-white bg-white/5 border border-white/10"
        >
          ← Back
        </button>

        <button
          type="button"
          onClick={onNext}
          className="px-6 py-2.5 rounded-full text-xs font-bold text-slate-950 bg-gradient-to-r from-brand-cyan to-brand-violet hover:shadow-glow-cyan transition-all"
        >
          Next: APK Upload →
        </button>
      </div>
    </div>
  );
};
