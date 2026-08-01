import React from 'react';
import { DeviceViewMode, ThemePreviewMode, UploadWizardState } from '../../../types';
import { PreviewDeviceSwitcher } from '../pipeline/PreviewDeviceSwitcher';
import { Eye, Download, Star, ShieldCheck, CheckCircle2, Globe, Mail } from 'lucide-react';

interface Step7Props {
  formData: UploadWizardState;
  onNext: () => void;
  onBack: () => void;
}

export const Step7Preview: React.FC<Step7Props> = ({ formData, onNext, onBack }) => {
  const [deviceMode, setDeviceMode] = React.useState<DeviceViewMode>('phone');
  const [themeMode, setThemeMode] = React.useState<ThemePreviewMode>('dark');

  return (
    <div className="space-y-6 text-left">
      <div className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
            <Eye className="w-5 h-5 text-brand-cyan" /> Step 7: Live Store Product Page Preview
          </h3>
          <p className="text-xs text-text-secondary">
            Verify exact layout representation as viewed by users on NexoApps store catalog.
          </p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
          Play Store Preview Mode
        </span>
      </div>

      {/* Device & Theme Switcher */}
      <PreviewDeviceSwitcher
        deviceMode={deviceMode}
        themeMode={themeMode}
        onDeviceChange={setDeviceMode}
        onThemeChange={setThemeMode}
      />

      {/* Rendered Mock Store Page Card */}
      <div className="glass-panel rounded-3xl border border-white/15 overflow-hidden shadow-2xl space-y-6 pb-8">
        
        {/* Banner */}
        <div className="h-48 sm:h-64 w-full relative overflow-hidden bg-gradient-to-r from-brand-cyan/20 to-brand-violet/20">
          <img
            src={formData.bannerUrl || 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1200&auto=format&fit=crop'}
            alt="Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        </div>

        {/* App Header Section */}
        <div className="px-6 sm:px-8 -mt-20 relative z-10 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-surface-200 border-2 border-white/20 flex items-center justify-center text-4xl sm:text-5xl shrink-0 shadow-2xl">
                {formData.iconUrl.startsWith('http') ? (
                  <img src={formData.iconUrl} alt="Icon" className="w-full h-full object-cover rounded-3xl" />
                ) : (
                  formData.iconUrl || '📱'
                )}
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white">{formData.title || 'Untitled App'}</h1>
                <p className="text-xs sm:text-sm text-brand-cyan font-semibold">{formData.tagline}</p>
                <div className="flex items-center gap-2 text-xs text-text-muted pt-1">
                  <span>{formData.developerName || 'Nexo Studio'}</span>
                  <ShieldCheck className="w-4 h-4 text-brand-cyan" title="Verified Developer" />
                </div>
              </div>
            </div>

            {/* Download Button */}
            <div className="w-full sm:w-auto">
              <button
                type="button"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-black text-slate-950 bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet shadow-glow-cyan flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download APK ({formData.fileSize || '25 MB'})</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 text-xs">
            <div>
              <span className="text-[10px] text-text-muted block font-semibold uppercase">Rating</span>
              <span className="font-bold text-amber-400 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400" /> 5.0 ★
              </span>
            </div>

            <div>
              <span className="text-[10px] text-text-muted block font-semibold uppercase">Version</span>
              <span className="font-mono font-bold text-white">v{formData.version}</span>
            </div>

            <div>
              <span className="text-[10px] text-text-muted block font-semibold uppercase">Category</span>
              <span className="font-bold text-brand-cyan">{formData.category}</span>
            </div>

            <div>
              <span className="text-[10px] text-text-muted block font-semibold uppercase">OS Compatibility</span>
              <span className="font-bold text-white">{formData.minAndroidVersion || 'Android 8.0+'}</span>
            </div>
          </div>

          {/* App Screenshots Carousel */}
          {formData.screenshots.length > 0 && (
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold text-white">Screenshots Showcase</h3>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                {formData.screenshots.map((url, idx) => (
                  <div key={idx} className="w-48 sm:w-56 rounded-2xl overflow-hidden border border-white/10 aspect-video shrink-0">
                    <img src={url} alt={`Preview screenshot ${idx}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description & Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="md:col-span-2 space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white">About Application</h3>
                <p className="text-xs text-text-secondary leading-relaxed whitespace-pre-line">
                  {formData.description}
                </p>
              </div>

              {formData.features.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-white">Key Features</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {formData.features.map((feat, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-white">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Developer Metadata Sidebar */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3 text-xs">
              <h4 className="font-bold text-white border-b border-white/10 pb-2">Developer Info</h4>
              <div className="space-y-2 text-text-secondary">
                <p className="flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-brand-cyan" />
                  <a href={formData.developerWebsite} target="_blank" rel="noreferrer" className="text-brand-cyan hover:underline truncate">
                    {formData.developerWebsite || 'Website N/A'}
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-brand-violet" />
                  <span className="truncate">{formData.developerEmail}</span>
                </p>
              </div>
            </div>
          </div>
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
          Next: Publish Options →
        </button>
      </div>
    </div>
  );
};
