import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export const ReleaseCenter: React.FC = () => {
  const releases = [
    { version: 'v5.4.0 (Phase 8E)', name: 'Autonomous AI Super Platform', date: 'August 2, 2026', status: 'Official Release' },
    { version: 'v5.3.0 (Phase 8D)', name: 'Autonomous AI Enterprise', date: 'August 2, 2026', status: 'Completed' },
    { version: 'v5.2.0 (Phase 8C)', name: 'AI Knowledge Cloud', date: 'August 2, 2026', status: 'Completed' },
    { version: 'v5.1.0 (Phase 8B)', name: 'AI Runtime Engine', date: 'August 2, 2026', status: 'Completed' },
    { version: 'v5.0.0 (Phase 8A)', name: 'AI Operating Cloud', date: 'August 2, 2026', status: 'Completed' },
  ];

  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-6">
      <h3 className="text-lg font-bold text-white">Platform Release Center & Version History</h3>
      <div className="space-y-3">
        {releases.map((r) => (
          <div key={r.version} className="p-4 rounded-2xl bg-surface-100 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-brand-cyan" />
              <div>
                <h4 className="font-mono text-xs font-bold text-white">{r.version} — {r.name}</h4>
                <p className="text-[10px] text-text-muted font-mono mt-0.5">Released: {r.date}</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold capitalize">
              {r.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
