import React, { useState } from 'react';
import { Sparkles, Send, Code, Database, Layout } from 'lucide-react';

interface PromptEditorProps {
  onGenerate: (prompt: string, framework: string) => void;
  isGenerating?: boolean;
}

export const PromptEditor: React.FC<PromptEditorProps> = ({ onGenerate, isGenerating }) => {
  const [prompt, setPrompt] = useState('');
  const [framework, setFramework] = useState('Next.js 14 (App Router)');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    onGenerate(prompt, framework);
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 text-left shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-brand-cyan" />
          <h3 className="text-base font-bold text-white">Prompt-to-App AI Scaffolder</h3>
        </div>
        <select
          value={framework}
          onChange={(e) => setFramework(e.target.value)}
          className="px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan"
        >
          <option>Next.js 14 (App Router)</option>
          <option>React + Vite</option>
          <option>Node.js Express API</option>
          <option>Full-Stack Postgres + Next</option>
        </select>
      </div>

      <div className="space-y-1">
        <textarea
          rows={4}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          required
          placeholder="Describe your app idea in plain English (e.g. Build a sports scoring web app with scorecards, player statistics, and PostgreSQL schema...)"
          className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan leading-relaxed"
        />
      </div>

      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <span className="flex items-center gap-1"><Code className="w-3.5 h-3.5 text-brand-cyan" /> TypeScript</span>
          <span className="flex items-center gap-1"><Layout className="w-3.5 h-3.5 text-brand-violet" /> Tailwind</span>
          <span className="flex items-center gap-1"><Database className="w-3.5 h-3.5 text-emerald-400" /> Schema</span>
        </div>

        <button
          type="submit"
          disabled={isGenerating}
          className="px-6 py-2.5 rounded-full text-xs font-black text-slate-950 bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet hover:shadow-glow-cyan flex items-center gap-2 transition-all"
        >
          <Sparkles className="w-4 h-4" />
          <span>{isGenerating ? 'Scaffolding App...' : 'Generate Full-Stack App'}</span>
        </button>
      </div>
    </form>
  );
};
