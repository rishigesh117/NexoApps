import React, { useState, useEffect } from 'react';
import { Boxes, Search, Plus, Sparkles, Tag, Check } from 'lucide-react';
import { componentLibraryService } from '../../services/componentLibraryService';

export const ComponentLibrary: React.FC = () => {
  const [components, setComponents] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCat, setSelectedCat] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [compRes, catRes] = await Promise.all([
        componentLibraryService.listComponents(),
        componentLibraryService.listCategories()
      ]);
      if (compRes.success) setComponents(compRes.data);
      if (catRes.success) setCategories([{ id: 'all', name: 'All' }, ...catRes.data]);
    } catch (err) {
      console.error('Failed to load component library', err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = components.filter(c => selectedCat === 'All' || c.category === selectedCat);

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Boxes className="w-5 h-5 text-brand-cyan" />
            Reusable AI Component Library & Block Registry
          </h2>
          <p className="text-xs text-text-muted mt-1">
            Pre-built modular AI components: Chatbots, RAG connectors, image synthesis, voice AI, and forms.
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCat(cat.name)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
              selectedCat === cat.name
                ? 'bg-brand-cyan text-slate-950 shadow-glow-cyan'
                : 'bg-surface-100 border border-white/10 text-text-secondary hover:text-white'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((comp) => (
          <div key={comp.id} className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-brand-cyan/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan uppercase">
                  {comp.category}
                </span>
                <span className="text-[10px] text-text-muted font-mono">{comp.componentType}</span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-brand-cyan transition-colors">{comp.name}</h3>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-text-muted">
              <span>Published Block</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Ready
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
