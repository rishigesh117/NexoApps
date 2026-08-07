import React from 'react';
import { Download, CheckCircle2 } from 'lucide-react';

export const DownloadManager: React.FC = () => {
  const downloads = [
    { id: 'd-1', name: 'Autonomous DevOps & Kubernetes Agent', version: '2.1.0', downloadedAt: '2026-08-04' },
    { id: 'd-2', name: 'Vector Knowledge RAG Plugin', version: '1.4.0', downloadedAt: '2026-08-01' }
  ];

  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
      <h3 className="text-base font-bold text-white flex items-center gap-2">
        <Download className="w-5 h-5 text-brand-cyan" />
        Installed Packages & Download History
      </h3>
      <div className="space-y-3">
        {downloads.map((d) => (
          <div key={d.id} className="p-4 rounded-2xl bg-surface-100 border border-white/10 flex items-center justify-between text-xs">
            <div>
              <h4 className="font-bold text-white">{d.name}</h4>
              <p className="text-text-muted font-mono mt-0.5">v{d.version} • Downloaded {d.downloadedAt}</p>
            </div>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Ready
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
