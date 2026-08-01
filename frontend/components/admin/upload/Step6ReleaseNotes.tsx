import React from 'react';
import { UploadWizardState } from '../../../types';
import { FileCheck, Sparkles, Bug, Clock, Compass } from 'lucide-react';

interface Step6Props {
  formData: UploadWizardState;
  onChange: (field: keyof UploadWizardState, value: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step6ReleaseNotes: React.FC<Step6Props> = ({
  formData,
  onChange,
  onNext,
  onBack,
}) => {
  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 text-left">
      <div className="border-b border-white/10 pb-4">
        <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-brand-cyan" /> Step 6: Version Release Notes & Changelog
        </h3>
        <p className="text-xs text-text-secondary">
          Document version changes, bug fixes, known issues, and roadmap previews (Markdown syntax supported).
        </p>
      </div>

      <div className="space-y-4 text-xs">
        
        {/* Current Version Badge */}
        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
          <span className="text-text-muted">Targeting Version Release:</span>
          <span className="font-mono font-bold text-brand-cyan bg-brand-cyan/10 px-3 py-1 rounded-full border border-brand-cyan/30">
            v{formData.version} (Build #{formData.buildNumber})
          </span>
        </div>

        {/* What's New / Release Notes */}
        <div className="space-y-1">
          <label className="text-text-secondary font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-brand-cyan" /> Release Notes & Highlights (Markdown Supported)
          </label>
          <textarea
            value={formData.releaseNotes}
            onChange={(e) => onChange('releaseNotes', e.target.value)}
            rows={4}
            placeholder="### What's New in v1.0.0&#10;- Ball by ball live scoring engine&#10;- Instant PDF match report exports&#10;- Dynamic Manhattan and Worm charts"
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white font-mono text-xs focus:border-brand-cyan/50 resize-none"
          />
        </div>

        {/* Bug Fixes */}
        <div className="space-y-1">
          <label className="text-text-secondary font-semibold flex items-center gap-1.5">
            <Bug className="w-3.5 h-3.5 text-rose-400" /> Resolved Bug Fixes
          </label>
          <textarea
            value={formData.bugFixes}
            onChange={(e) => onChange('bugFixes', e.target.value)}
            rows={2}
            placeholder="- Resolved tablet orientation responsive layout scaling issue&#10;- Fixed over counter reset edge case"
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-3 text-white font-mono text-xs focus:border-brand-cyan/50 resize-none"
          />
        </div>

        {/* Known Issues */}
        <div className="space-y-1">
          <label className="text-text-secondary font-semibold flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-400" /> Known Issues & Workarounds
          </label>
          <textarea
            value={formData.knownIssues}
            onChange={(e) => onChange('knownIssues', e.target.value)}
            rows={2}
            placeholder="- Dark mode PDF export background requires Android 9+ for hardware acceleration"
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-3 text-white font-mono text-xs focus:border-brand-cyan/50 resize-none"
          />
        </div>

        {/* Coming Soon Roadmap */}
        <div className="space-y-1">
          <label className="text-text-secondary font-semibold flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-brand-violet" /> Upcoming Features (Roadmap)
          </label>
          <input
            type="text"
            value={formData.comingSoon}
            onChange={(e) => onChange('comingSoon', e.target.value)}
            placeholder="Voice commentary synthesis, Bluetooth scorekeeper synchronization"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-white"
          />
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
          Next: Store Preview →
        </button>
      </div>
    </div>
  );
};
