import React, { useState } from 'react';
import { Edit3, Save, History, Plus, Sparkles, Check } from 'lucide-react';
import { promptService } from '../../services/promptService';
import { PromptTemplate } from '../../../shared/types';

interface PromptEditorProps {
  template?: PromptTemplate;
  onSave?: () => void;
}

export const PromptEditor: React.FC<PromptEditorProps> = ({ template, onSave }) => {
  const [title, setTitle] = useState(template?.title || '');
  const [category, setCategory] = useState(template?.category || 'Engineering');
  const [description, setDescription] = useState(template?.description || '');
  const [content, setContent] = useState('Act as an Enterprise AI Architect. Perform analysis on {{target_payload}} with compliance framework {{framework}}.');
  const [commitMsg, setCommitMsg] = useState('Update template parameters');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (template) {
        await promptService.addVersion(template.id, {
          templateContent: content,
          commitMessage: commitMsg
        });
      } else {
        await promptService.createTemplate({
          title,
          category,
          description,
          templateContent: content,
          variables: ['target_payload', 'framework']
        });
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      if (onSave) onSave();
    } catch (err) {
      console.error('Failed to save prompt template', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-brand-cyan" />
            {template ? `Prompt Editor — ${template.title}` : 'Create New Prompt Template'}
          </h3>
          <p className="text-xs text-text-muted mt-1">
            Define variable parameters using <code className="text-brand-cyan font-mono">{"{{variable_name}}"}</code> syntax.
          </p>
        </div>
        {saved && (
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
            <Check className="w-4 h-4" />
            Version Committed Successfully
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-text-secondary mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Cloud Security Assessment"
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-white text-xs focus:border-brand-cyan focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-secondary mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-white text-xs focus:border-brand-cyan focus:outline-none"
            >
              <option value="Engineering">Engineering</option>
              <option value="Security">Security</option>
              <option value="Data">Data</option>
              <option value="Writing">Writing</option>
              <option value="General">General</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-text-secondary mb-1">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief explanation of what this prompt accomplishes..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-white text-xs focus:border-brand-cyan focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-text-secondary mb-1">System Prompt Template</label>
          <textarea
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-surface-100 border border-white/10 text-white font-mono text-xs focus:border-brand-cyan focus:outline-none leading-relaxed"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-text-secondary mb-1">Commit Message</label>
          <input
            type="text"
            value={commitMsg}
            onChange={(e) => setCommitMsg(e.target.value)}
            placeholder="Version change notes..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-white text-xs focus:border-brand-cyan focus:outline-none"
          />
        </div>

        <div className="flex items-center justify-end pt-4 border-t border-white/10">
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue text-white font-bold text-xs shadow-glow-cyan hover:opacity-95 disabled:opacity-50 transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Commit Version'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
