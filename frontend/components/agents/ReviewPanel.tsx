import React from 'react';
import { CodeReview, BugReport } from '../../types';
import { FileCheck, ShieldAlert, CheckCircle2, AlertTriangle } from 'lucide-react';

interface ReviewPanelProps {
  reviews: CodeReview[];
  bugs: BugReport[];
}

export const ReviewPanel: React.FC<ReviewPanelProps> = ({ reviews, bugs }) => {
  return (
    <div className="space-y-6 text-left">
      {/* Code Reviews Section */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-white/10 pb-2">
          <FileCheck className="w-4 h-4 text-emerald-400" /> Automated Code Reviews
        </h3>
        {reviews.map((r) => (
          <div key={r.id} className="glass-panel p-5 rounded-3xl border border-white/10 space-y-3 shadow-2xl">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-white text-sm">{r.pullRequestTitle}</h4>
              <span className="px-3 py-0.5 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Score: {r.qualityScore}/100 ({r.status})
              </span>
            </div>
            <ul className="space-y-1 text-xs text-text-secondary list-disc list-inside">
              {r.comments.map((c, idx) => (
                <li key={idx}>{c}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bug Detection Section */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-white/10 pb-2">
          <ShieldAlert className="w-4 h-4 text-amber-400" /> AI Static Bug Detection
        </h3>
        {bugs.map((b) => (
          <div key={b.id} className="glass-panel p-5 rounded-3xl border border-white/10 space-y-2 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-brand-cyan">{b.filePath}</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {b.severity} Severity
              </span>
            </div>
            <h4 className="font-bold text-white text-xs">{b.issueTitle}</h4>
            <p className="text-xs text-text-secondary">{b.description}</p>
            {b.suggestedFix && (
              <p className="font-mono text-[11px] text-emerald-400 bg-slate-900 p-2 rounded-xl border border-white/5">
                Fix: {b.suggestedFix}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
