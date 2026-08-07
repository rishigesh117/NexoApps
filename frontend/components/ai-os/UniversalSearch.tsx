import React, { useState } from 'react';
import { Search, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { globalSearchService } from '../../services/globalSearchService';

export const UniversalSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await globalSearchService.search(query);
      if (res.success) setResults(res.data);
    } catch (err) {
      console.error('Search failed', err);
    }
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-6">
      <h3 className="text-base font-bold text-white flex items-center gap-2">
        <Search className="w-5 h-5 text-brand-cyan" />
        Universal AI OS Global Search Engine
      </h3>

      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search projects, AI applications, agents, APIs across modules..."
          className="flex-1 px-4 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-white text-xs focus:border-brand-cyan focus:outline-none"
        />
        <button type="submit" className="px-5 py-2.5 rounded-xl bg-brand-cyan text-slate-950 font-bold text-xs shadow-glow-cyan">
          Search
        </button>
      </form>

      <div className="space-y-3">
        {results.map((r) => (
          <div key={r.id} className="p-4 rounded-2xl bg-surface-100/80 border border-white/10 flex items-center justify-between text-xs">
            <div>
              <span className="text-[10px] font-mono text-brand-cyan uppercase">{r.entityType}</span>
              <h4 className="font-bold text-white mt-0.5">{r.title}</h4>
              <p className="text-text-muted mt-0.5">{r.description}</p>
            </div>
            <Link href={r.targetUrl} className="p-2 rounded-xl bg-surface border border-white/10 hover:border-brand-cyan text-text-secondary hover:text-brand-cyan">
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
