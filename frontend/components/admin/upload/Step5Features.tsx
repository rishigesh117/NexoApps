import React, { useState } from 'react';
import { UploadWizardState } from '../../../types';
import { ListChecks, Plus, Trash2, ArrowUp, ArrowDown, CheckCircle2 } from 'lucide-react';

interface Step5Props {
  formData: UploadWizardState;
  onChange: (field: keyof UploadWizardState, value: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step5Features: React.FC<Step5Props> = ({
  formData,
  onChange,
  onNext,
  onBack,
}) => {
  const [newFeatureText, setNewFeatureText] = useState('');

  const handleAddFeature = () => {
    if (!newFeatureText.trim()) return;
    onChange('features', [...formData.features, newFeatureText.trim()]);
    setNewFeatureText('');
  };

  const handleDeleteFeature = (index: number) => {
    const list = [...formData.features];
    list.splice(index, 1);
    onChange('features', list);
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const list = [...formData.features];
    const temp = list[index - 1];
    list[index - 1] = list[index];
    list[index] = temp;
    onChange('features', list);
  };

  const handleMoveDown = (index: number) => {
    if (index === formData.features.length - 1) return;
    const list = [...formData.features];
    const temp = list[index + 1];
    list[index + 1] = list[index];
    list[index] = temp;
    onChange('features', list);
  };

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 text-left">
      <div className="border-b border-white/10 pb-4">
        <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
          <ListChecks className="w-5 h-5 text-brand-cyan" /> Step 5: Key Application Features & Highlights
        </h3>
        <p className="text-xs text-text-secondary">
          Add, delete, and reorder key bulleted feature highlights for your application product page.
        </p>
      </div>

      {/* Add New Feature Input */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-white block">Add Feature Highlight</label>
        <div className="flex gap-2 text-xs">
          <input
            type="text"
            value={newFeatureText}
            onChange={(e) => setNewFeatureText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddFeature();
              }
            }}
            placeholder="e.g. Ball by Ball Live Scoring & High Precision PDF Exports"
            className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-white"
          />
          <button
            type="button"
            onClick={handleAddFeature}
            className="px-5 py-2.5 rounded-2xl font-bold bg-brand-cyan/20 text-brand-cyan hover:bg-brand-cyan/30 flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" /> Add Feature
          </button>
        </div>
      </div>

      {/* Feature List Items with Reordering */}
      <div className="space-y-2 pt-2">
        <label className="text-xs font-bold text-white block">Feature List ({formData.features.length} Items)</label>

        {formData.features.length === 0 ? (
          <p className="text-xs text-text-muted italic py-4 text-center">No feature highlights added yet.</p>
        ) : (
          <div className="space-y-2">
            {formData.features.map((feat, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-3 text-xs hover:border-white/20 transition-all"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-semibold text-white truncate">{feat}</span>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleMoveUp(idx)}
                    disabled={idx === 0}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-text-muted hover:text-white disabled:opacity-30"
                    title="Move Up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMoveDown(idx)}
                    disabled={idx === formData.features.length - 1}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-text-muted hover:text-white disabled:opacity-30"
                    title="Move Down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteFeature(idx)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/10 text-text-muted hover:text-rose-400 transition-colors ml-1"
                    title="Delete Feature"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2.5 rounded-full text-xs font-semibold text-text-secondary hover:text-white bg-white/5 border border-white/10"
        >
          ← Back
        </button>

        <button
          type="button"
          onClick={onNext}
          className="px-6 py-2.5 rounded-full text-xs font-bold text-slate-950 bg-gradient-to-r from-brand-cyan to-brand-violet hover:shadow-glow-cyan transition-all"
        >
          Next: Release Notes →
        </button>
      </div>
    </div>
  );
};
