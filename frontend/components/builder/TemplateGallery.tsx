import React from 'react';
import { AITemplate } from '../../types';
import { Star, DownloadCloud, Sparkles } from 'lucide-react';

interface TemplateGalleryProps {
  templates: AITemplate[];
  onSelectTemplate?: (template: AITemplate) => void;
}

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({ templates, onSelectTemplate }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
      {templates.map((t) => (
        <div key={t.id} className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-brand-cyan/40 transition-all flex flex-col justify-between space-y-4 shadow-2xl">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-2xl">{t.icon}</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20">
                {t.category}
              </span>
            </div>

            <h3 className="font-extrabold text-white text-base leading-tight">{t.title}</h3>
            <p className="text-xs text-text-secondary line-clamp-3">{t.description}</p>
          </div>

          <div className="flex items-center justify-between border-t border-white/10 pt-3 text-xs text-text-muted">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400" /> {t.starsCount}
              </span>
              <span className="flex items-center gap-1">
                <DownloadCloud className="w-3.5 h-3.5 text-brand-cyan" /> {t.downloadsCount}
              </span>
            </div>

            <button
              type="button"
              onClick={() => onSelectTemplate && onSelectTemplate(t)}
              className="px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-950 bg-gradient-to-r from-brand-cyan to-brand-violet hover:shadow-glow-cyan transition-all"
            >
              Use Template
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
