import React from 'react';
import { History, Sparkles, Bug, CheckCircle2, Zap } from 'lucide-react';
import { AppItem } from '../../types';

interface VersionHistoryTabProps {
  app: AppItem;
  changelog: Array<{
    version: string;
    releaseDate: string;
    addedFeatures: string[];
    fixedBugs: string[];
    improvements: string[];
    releaseNotes: string;
  }>;
}

export const VersionHistoryTab: React.FC<VersionHistoryTabProps> = ({ app, changelog }) => {
  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 text-left">
      <div className="pb-4 border-b border-white/10 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <History className="w-5 h-5 text-brand-cyan" /> Version History & Changelog
          </h3>
          <p className="text-xs text-text-muted mt-0.5">
            Release updates, feature additions, and bug fixes for {app.title}
          </p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30">
          Latest: v{app.version}
        </span>
      </div>

      <div className="space-y-6">
        {changelog.map((ver, idx) => (
          <div key={idx} className="p-5 rounded-2xl bg-surface-100/80 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold text-white font-mono">v{ver.version}</span>
                {idx === 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Current Version
                  </span>
                )}
              </div>
              <span className="text-xs text-text-muted">{ver.releaseDate}</span>
            </div>

            <p className="text-xs text-text-secondary leading-relaxed bg-background/50 p-3 rounded-xl border border-white/5">
              "{ver.releaseNotes}"
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {/* Added Features */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-brand-cyan flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Added Features
                </span>
                <ul className="space-y-1 text-text-muted">
                  {ver.addedFeatures.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-1.5 text-[11px]">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bug Fixes */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1">
                  <Bug className="w-3.5 h-3.5" /> Bug Fixes
                </span>
                <ul className="space-y-1 text-text-muted">
                  {ver.fixedBugs.map((bug, bIdx) => (
                    <li key={bIdx} className="flex items-center gap-1.5 text-[11px]">
                      <CheckCircle2 className="w-3 h-3 text-amber-400 shrink-0" />
                      <span>{bug}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Improvements */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-purple-400 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" /> Improvements
                </span>
                <ul className="space-y-1 text-text-muted">
                  {ver.improvements.map((imp, iIdx) => (
                    <li key={iIdx} className="flex items-center gap-1.5 text-[11px]">
                      <CheckCircle2 className="w-3 h-3 text-purple-400 shrink-0" />
                      <span>{imp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};
