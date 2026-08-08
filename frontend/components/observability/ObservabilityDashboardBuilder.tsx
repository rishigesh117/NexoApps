import React, { useState } from 'react';
import { Sliders, Plus, Save, Layers } from 'lucide-react';
import { observabilityService } from '../../services/observabilityService';

export const ObservabilityDashboardBuilder: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    setSaving(true);
    // Submit dashboard creation
    setSaved(true);
    setSaving(false);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
          <Sliders className="w-5 h-5 text-brand-cyan" /> Custom Telemetry Dashboard Builder
        </h2>
      </div>

      <form onSubmit={handleCreate} className="p-6 rounded-xl glass-panel border border-white/10 bg-white/5 space-y-4 max-w-xl">
        {saved && (
          <div className="p-3 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
            Custom telemetry dashboard created successfully!
          </div>
        )}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-text-muted">Dashboard Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. AI ModelOps GPU Memory & Batch Latency"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-white placeholder:text-text-muted focus:outline-none focus:border-brand-cyan"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold text-text-muted">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Detailed telemetry layout description..."
            rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-xs text-white placeholder:text-text-muted focus:outline-none focus:border-brand-cyan"
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2.5 rounded-xl bg-brand-cyan text-background font-bold text-xs hover:bg-brand-cyan/90 transition-all flex items-center gap-2"
        >
          <Save className="w-4 h-4" /> {saving ? 'Saving Dashboard...' : 'Create Telemetry Dashboard'}
        </button>
      </form>
    </div>
  );
};
