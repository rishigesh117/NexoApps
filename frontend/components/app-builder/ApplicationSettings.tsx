import React, { useState } from 'react';
import { Settings, Save, Check } from 'lucide-react';
import { AIApplication } from '../../../shared/types';

interface ApplicationSettingsProps {
  application?: AIApplication;
}

export const ApplicationSettings: React.FC<ApplicationSettingsProps> = ({ application }) => {
  const [name, setName] = useState(application?.name || 'Enterprise Customer Copilot');
  const [themeMode, setThemeMode] = useState<'dark' | 'light' | 'system'>('dark');
  const [rateLimit, setRateLimit] = useState(100);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-brand-cyan" />
          Application Settings & Runtime Policies
        </h3>
        {saved && (
          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
            <Check className="w-4 h-4" /> Settings Saved
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-4 max-w-lg">
        <div>
          <label className="block text-xs font-semibold text-text-secondary mb-1">Application Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-white text-xs focus:border-brand-cyan focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-text-secondary mb-1">Theme Mode</label>
          <select
            value={themeMode}
            onChange={(e: any) => setThemeMode(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-white text-xs focus:border-brand-cyan focus:outline-none"
          >
            <option value="dark">Dark Theme (Nexo Glassmorphism)</option>
            <option value="light">Light Theme</option>
            <option value="system">System Default</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-text-secondary mb-1">API Rate Limit (Requests per Minute)</label>
          <input
            type="number"
            value={rateLimit}
            onChange={(e) => setRateLimit(Number(e.target.value))}
            className="w-full px-3.5 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-white text-xs focus:border-brand-cyan focus:outline-none font-mono"
          />
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue text-white font-bold text-xs shadow-glow-cyan hover:opacity-95 transition-all flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Application Settings</span>
        </button>
      </form>
    </div>
  );
};
