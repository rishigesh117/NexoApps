import React from 'react';
import { DeveloperApiKey } from '../../types';
import { Key, Copy, CheckCircle2 } from 'lucide-react';

interface ApiKeyCardProps {
  apiKey: DeveloperApiKey;
}

export const ApiKeyCard: React.FC<ApiKeyCardProps> = ({ apiKey }) => {
  return (
    <div className="glass-panel p-5 rounded-3xl border border-white/10 flex items-center justify-between gap-4 text-left shadow-2xl">
      <div className="space-y-1 min-w-0">
        <div className="flex items-center gap-2">
          <Key className="w-4 h-4 text-amber-400 shrink-0" />
          <h4 className="font-extrabold text-white text-sm truncate">{apiKey.name}</h4>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Active
          </span>
        </div>
        <p className="text-xs font-mono text-text-muted truncate">{apiKey.apiKey}</p>
      </div>

      <button
        type="button"
        onClick={() => {
          navigator.clipboard.writeText(apiKey.apiKey);
          alert('API Key copied to clipboard!');
        }}
        className="px-4 py-1.5 rounded-full text-xs font-bold bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 transition-all shrink-0"
      >
        <Copy className="w-3.5 h-3.5" /> Copy Key
      </button>
    </div>
  );
};
