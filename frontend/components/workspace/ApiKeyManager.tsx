import React, { useState } from 'react';
import { ProjectApiKey } from '../../types';
import { Key, Plus, Copy, Check, Shield } from 'lucide-react';

interface ApiKeyManagerProps {
  apiKeys: ProjectApiKey[];
  onCreateKey: (keyName: string) => void;
}

export const ApiKeyManager: React.FC<ApiKeyManagerProps> = ({ apiKeys, onCreateKey }) => {
  const [newKeyName, setNewKeyName] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (key: string, id: string) => {
    navigator.clipboard.writeText(key);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;
    onCreateKey(newKeyName);
    setNewKeyName('');
  };

  return (
    <div className="space-y-6 text-left">
      <form onSubmit={handleCreate} className="glass-panel p-5 rounded-3xl border border-white/10 flex items-center gap-3">
        <input
          type="text"
          value={newKeyName}
          onChange={(e) => setNewKeyName(e.target.value)}
          placeholder="New Organization API Key Name (e.g. Production SDK Key)..."
          className="flex-1 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan"
        />
        <button
          type="submit"
          className="px-5 py-2.5 rounded-full text-xs font-bold text-slate-950 bg-gradient-to-r from-brand-cyan to-brand-violet hover:shadow-glow-cyan flex items-center gap-1.5 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Generate Key</span>
        </button>
      </form>

      <div className="space-y-3">
        {apiKeys.map((k) => (
          <div key={k.id} className="glass-panel p-5 rounded-3xl border border-white/10 flex items-center justify-between gap-4 text-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-brand-violet" />
                <h4 className="font-extrabold text-white">{k.keyName}</h4>
              </div>
              <p className="font-mono text-text-muted text-[11px]">{k.apiKey}</p>
              <span className="text-[10px] text-text-secondary block">
                Created: {new Date(k.createdAt).toLocaleDateString()}
              </span>
            </div>

            <button
              type="button"
              onClick={() => handleCopy(k.apiKey, k.id)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all shrink-0"
              title="Copy API Key"
            >
              {copiedId === k.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
