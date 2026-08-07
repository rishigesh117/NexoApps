import React from 'react';
import { Layers } from 'lucide-react';

export const MarketplaceCollections: React.FC = () => {
  const collections = [
    { id: 'col-1', title: 'Kubernetes & Cloud Native Suite', count: '12 Packages', desc: 'Complete autonomous cluster agents, health probes, and deployment tools.' },
    { id: 'col-2', title: 'Enterprise RAG & Data Connectors', count: '8 Packages', desc: 'Vector DB connectors, Pinecone RAG pipelines, and embedding utilities.' }
  ];

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 rounded-3xl border border-white/10">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-brand-cyan" />
          Featured Marketplace Collections
        </h2>
        <p className="text-xs text-text-muted mt-1">Curated starter bundles and enterprise solution packages.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {collections.map((c) => (
          <div key={c.id} className="glass-panel p-6 rounded-3xl border border-white/10 space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-brand-violet/10 border border-brand-violet/30 text-brand-violet">
              {c.count}
            </span>
            <h3 className="text-lg font-bold text-white">{c.title}</h3>
            <p className="text-xs text-text-muted">{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
