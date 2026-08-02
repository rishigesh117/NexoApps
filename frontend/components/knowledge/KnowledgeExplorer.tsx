import React from 'react';
import { Database, FileText, Cpu, Plus } from 'lucide-react';

export const KnowledgeExplorer: React.FC = () => {
  const bases = [
    { id: 'kb-1', name: 'Enterprise Engineering Knowledge Vault', docs: 128, chunks: '42.8k', model: 'text-embedding-3-large', dim: 1536 },
    { id: 'kb-2', name: 'Product Documentation & User Guides', docs: 85, chunks: '24.1k', model: 'text-embedding-3-large', dim: 1536 },
    { id: 'kb-3', name: 'Security & Compliance Knowledge Base', docs: 42, chunks: '12.5k', model: 'text-embedding-3-large', dim: 1536 },
  ];

  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">Enterprise Knowledge Vaults</h3>
          <p className="text-xs text-text-muted">Partitioned RAG knowledge bases with 1536-dim vector embeddings</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue text-white text-xs font-bold shadow-glow-cyan hover:opacity-95 transition-all">
          <Plus className="w-3.5 h-3.5" /> Create Knowledge Base
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {bases.map((b) => (
          <div key={b.id} className="p-4 rounded-2xl bg-surface-100 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-white truncate">{b.name}</span>
            </div>
            <p className="text-[10px] text-text-muted font-mono">{b.model} ({b.dim}d)</p>
            <div className="grid grid-cols-2 gap-2 text-center py-2 bg-background/50 rounded-xl border border-white/5 text-xs">
              <div>
                <p className="font-bold text-white">{b.docs}</p>
                <p className="text-[10px] text-text-muted">Documents</p>
              </div>
              <div>
                <p className="font-bold text-brand-cyan">{b.chunks}</p>
                <p className="text-[10px] text-text-muted">Vector Chunks</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
