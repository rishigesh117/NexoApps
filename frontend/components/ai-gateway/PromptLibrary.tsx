import React, { useState, useEffect } from 'react';
import { BookOpen, Search, Plus, Tag, Sparkles, Copy, Check, Filter } from 'lucide-react';
import { promptService } from '../../services/promptService';
import { PromptTemplate } from '../../../shared/types';

interface PromptLibraryProps {
  onSelectPrompt?: (template: PromptTemplate) => void;
}

export const PromptLibrary: React.FC<PromptLibraryProps> = ({ onSelectPrompt }) => {
  const [templates, setTemplates] = useState<PromptTemplate[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const res = await promptService.listTemplates();
      if (res.success) {
        setTemplates(res.data);
      }
    } catch (err) {
      console.error('Failed to load prompt templates', err);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', 'Engineering', 'Security', 'Data', 'Writing', 'General'];

  const filtered = templates.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) || (t.description && t.description.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-white/10">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-brand-cyan" />
            Enterprise Prompt Library & Version Control
          </h2>
          <p className="text-xs text-text-muted mt-1">
            Curated system prompts, variable injection templates, and audit version history.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="w-4 h-4 text-text-muted absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search prompts..."
              className="w-full sm:w-64 pl-9 pr-4 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-white text-xs focus:border-brand-cyan focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-brand-cyan text-slate-950 shadow-glow-cyan'
                : 'bg-surface-100 border border-white/10 text-text-secondary hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((tmpl) => (
          <div
            key={tmpl.id}
            onClick={() => onSelectPrompt && onSelectPrompt(tmpl)}
            className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-brand-cyan/40 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-brand-violet/10 border border-brand-violet/30 text-brand-violet">
                  {tmpl.category || 'General'}
                </span>
                <span className="text-[10px] text-text-muted font-mono">{tmpl.slug}</span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-brand-cyan transition-colors">{tmpl.title}</h3>
              <p className="text-xs text-text-muted mt-2 line-clamp-2">{tmpl.description}</p>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-1.5 flex-wrap">
                {tmpl.tags && tmpl.tags.map((tag) => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-text-secondary font-mono">
                    #{tag}
                  </span>
                ))}
              </div>
              <span className="text-xs font-semibold text-brand-cyan flex items-center gap-1">
                View & Edit →
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
