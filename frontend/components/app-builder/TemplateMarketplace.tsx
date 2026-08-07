import React, { useState, useEffect } from 'react';
import { Store, Search, Sparkles, ArrowRight, Download, Check } from 'lucide-react';
import { templateService } from '../../services/templateService';

export const TemplateMarketplace: React.FC = () => {
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const res = await templateService.listTemplates();
      if (res.success) {
        setTemplates(res.data);
      }
    } catch (err) {
      console.error('Failed to load templates', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Store className="w-5 h-5 text-brand-cyan" />
            AI Application Template Marketplace
          </h2>
          <p className="text-xs text-text-muted mt-1">
            Instantly clone pre-built AI starter apps for Customer Copilots, Code Auditors, Image Studios, and RAG search.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {templates.map((tmpl) => (
          <div key={tmpl.id} className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-brand-cyan/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-brand-violet/10 border border-brand-violet/30 text-brand-violet">
                  {tmpl.category}
                </span>
                <span className="text-[10px] text-text-muted font-mono">{tmpl.usageCount} installs</span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-brand-cyan transition-colors">{tmpl.name}</h3>
              <p className="text-xs text-text-muted mt-2 leading-relaxed">{tmpl.description}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
              <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue text-white font-bold text-xs shadow-glow-cyan hover:opacity-95 transition-all flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                <span>Clone & Launch App</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
