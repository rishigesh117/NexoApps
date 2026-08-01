import React, { useState } from 'react';
import { Search, BookOpen, Filter } from 'lucide-react';

interface KnowledgeSearchProps {
  onSearch: (query: string, category: string) => void;
}

export const KnowledgeSearch: React.FC<KnowledgeSearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const categories = ['All', 'Account', 'Publishing', 'Developer', 'Downloads', 'Security', 'Owner'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, category);
  };

  return (
    <div className="w-full space-y-4 text-left">
      <form onSubmit={handleSubmit} className="relative w-full">
        <Search className="w-5 h-5 text-brand-cyan absolute left-4 top-4 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onSearch(e.target.value, category);
          }}
          placeholder="Search knowledge articles, guides, FAQs, and publishing documentation..."
          className="w-full pl-12 pr-4 py-3.5 rounded-full bg-white/5 border border-white/15 text-white placeholder-text-muted text-xs focus:outline-none focus:border-brand-cyan shadow-2xl transition-all"
        />
      </form>

      <div className="flex items-center gap-1.5 flex-wrap text-xs">
        <Filter className="w-4 h-4 text-brand-cyan shrink-0 mr-1" />
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => {
              setCategory(cat);
              onSearch(query, cat);
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              category === cat
                ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/40 shadow-glow-cyan'
                : 'bg-white/5 text-text-muted hover:text-white border border-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};
