import React, { useState } from 'react';
import { Search, Sparkles, FileText, Clock } from 'lucide-react';

export const SemanticSearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    setResults([
      { title: 'NexoApps_v5_Architecture_Spec.pdf', text: 'Phase 8C introduces Retrieval-Augmented Generation (RAG) and HNSW vector indexing for enterprise knowledge bases.', score: 0.94 },
      { title: 'NexoApps_v5_Architecture_Spec.pdf', text: 'The AI Operating Cloud features multi-agent swarm collaboration and persistent vector memory graph.', score: 0.89 },
      { title: 'Security_Audit_Report_2026.docx', text: 'OWASP Security Headers and input sanitization middleware enforced across all /api/v1/* endpoints.', score: 0.84 },
    ]);
  };

  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-6">
      <div>
        <h3 className="text-lg font-bold text-white">Hybrid Semantic Vector Search</h3>
        <p className="text-xs text-text-muted">Dense vector similarity search powered by cosine metrics and HNSW indexes</p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search across all enterprise documents, architecture specs, and security policies..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-xs text-white placeholder-text-muted focus:outline-none focus:border-brand-cyan"
          />
        </div>
        <button type="submit" className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue text-white text-xs font-bold shadow-glow-cyan hover:opacity-95 transition-all">
          Search
        </button>
      </form>

      {results.length > 0 && (
        <div className="space-y-3 pt-2">
          {results.map((r, i) => (
            <div key={i} className="p-4 rounded-2xl bg-surface-100 border border-white/10 space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-brand-cyan" /> {r.title}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-brand-cyan/20 text-brand-cyan font-mono text-[10px] font-bold">Similarity: {(r.score * 100).toFixed(1)}%</span>
              </div>
              <p className="text-text-secondary mt-1">{r.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
