import React, { useState } from 'react';
import { Settings, Shield, Bell, HardDrive, CheckCircle2 } from 'lucide-react';

export const ObservabilitySettings: React.FC = () => {
  const [retention, setRetention] = useState('30');
  const [autoTriage, setAutoTriage] = useState(true);
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
          <Settings className="w-5 h-5 text-brand-cyan" /> Observability Platform Configuration & Policies
        </h2>
      </div>

      <form onSubmit={handleSave} className="p-6 rounded-xl glass-panel border border-white/10 bg-white/5 space-y-6 max-w-2xl">
        {saved && (
          <div className="p-3 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Observability settings saved successfully.
          </div>
        )}

        <div className="space-y-2">
          <label className="text-xs font-semibold text-text-muted uppercase">Log & Metric Retention Period</label>
          <select
            value={retention}
            onChange={(e) => setRetention(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-cyan"
          >
            <option value="15">15 Days</option>
            <option value="30">30 Days (Standard)</option>
            <option value="90">90 Days (Enterprise Compliance)</option>
            <option value="365">365 Days (Full Audit Archival)</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-text-muted uppercase">AI Intelligent Operations Mode</label>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-black/20 border border-white/10">
            <input
              type="checkbox"
              id="autotriage"
              checked={autoTriage}
              onChange={(e) => setAutoTriage(e.target.checked)}
              className="w-4 h-4 accent-brand-cyan"
            />
            <label htmlFor="autotriage" className="text-xs text-white">
              Enable advisory AI incident correlation & automated remediation recommendations
            </label>
          </div>
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
