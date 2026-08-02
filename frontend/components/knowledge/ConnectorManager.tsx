import React from 'react';
import { Link2, RefreshCw, CheckCircle2 } from 'lucide-react';

export const ConnectorManager: React.FC = () => {
  const connectors = [
    { name: 'Confluence Wiki Connector', type: 'confluence', status: 'connected', lastSync: '1 hr ago' },
    { name: 'GitHub Enterprise Repos Connector', type: 'github', status: 'connected', lastSync: '2 hrs ago' },
    { name: 'Notion Engineering Docs Connector', type: 'notion', status: 'connected', lastSync: '3 hrs ago' },
  ];

  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">Multi-Source Knowledge Connectors</h3>
          <p className="text-xs text-text-muted">Automated sync pipelines for Confluence, Notion, GitHub, and Google Drive</p>
        </div>
      </div>

      <div className="space-y-3">
        {connectors.map((c) => (
          <div key={c.name} className="p-4 rounded-2xl bg-surface-100 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link2 className="w-4 h-4 text-brand-cyan" />
              <div>
                <h4 className="text-xs font-bold text-white">{c.name}</h4>
                <p className="text-[10px] text-text-muted font-mono mt-0.5">Type: {c.type} • Last Sync: {c.lastSync}</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold capitalize flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Connected
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
