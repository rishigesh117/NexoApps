import React, { useState } from 'react';
import { Settings, CheckCircle2 } from 'lucide-react';

export const NetworkingSettings: React.FC = () => {
  const [mode, setMode] = useState('reverse_proxy');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-brand-cyan" /> Enterprise Networking Global Settings
        </h2>
      </div>

      <form onSubmit={handleSave} className="p-6 rounded-xl glass-panel border border-white/10 bg-white/5 space-y-6 max-w-2xl">
        {saved && (
          <div className="p-3 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Networking settings saved.
          </div>
        )}

        <div className="space-y-2">
          <label className="text-xs font-semibold text-text-muted uppercase">Default Ingress Gateway Mode</label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-cyan"
          >
            <option value="reverse_proxy">Reverse Proxy (Standard Ingress)</option>
            <option value="api_mesh">API Service Mesh (Zero-Trust mTLS)</option>
            <option value="ingress">Kubernetes Ingress Controller</option>
          </select>
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-brand-cyan text-background font-bold text-xs hover:bg-brand-cyan/90 transition-all"
        >
          Save Configuration
        </button>
      </form>
    </div>
  );
};
