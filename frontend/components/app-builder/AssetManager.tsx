import React from 'react';
import { Image as ImageIcon, Upload, FileText, Trash2 } from 'lucide-react';

export const AssetManager: React.FC = () => {
  const assets = [
    { id: 'a-1', name: 'copilot-banner.png', size: '512 KB', type: 'image/png' },
    { id: 'a-2', name: 'support-docs.pdf', size: '2.4 MB', type: 'application/pdf' }
  ];

  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-brand-cyan" />
          Application Static Asset Vault
        </h3>
        <button className="px-4 py-2 rounded-xl bg-brand-cyan text-slate-950 font-bold text-xs shadow-glow-cyan flex items-center gap-2">
          <Upload className="w-4 h-4" /> Upload Asset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {assets.map((a) => (
          <div key={a.id} className="p-4 rounded-2xl bg-surface-100 border border-white/10 flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-white">{a.name}</h4>
              <p className="text-[10px] text-text-muted">{a.size} • {a.type}</p>
            </div>
            <Trash2 className="w-4 h-4 text-text-muted hover:text-rose-400 cursor-pointer transition-colors" />
          </div>
        ))}
      </div>
    </div>
  );
};
