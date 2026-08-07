import React, { useState } from 'react';
import { BookOpen, Search, Sparkles, FileText, ArrowRight } from 'lucide-react';

export const KnowledgeBaseExplorer: React.FC = () => {
  const [articles] = useState([
    { id: 'art-1', title: 'Phase 11D Version 8.4 Architecture Overview', category: 'Architecture', views: 240 },
    { id: 'art-2', title: 'Enterprise Digital Workplace Deployment Guide', category: 'DevOps', views: 185 },
    { id: 'art-3', title: 'AI Collaboration Platform API Integration Blueprint', category: 'API', views: 310 }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-brand-cyan" /> Knowledge Base Explorer
          </h2>
          <p className="text-text-muted text-sm">Enterprise knowledge articles, AI recommendations & documentation</p>
        </div>
      </div>

      <div className="glass-panel p-4 rounded-xl border border-white/10 flex items-center gap-3">
        <Search className="w-5 h-5 text-text-muted" />
        <input
          type="text"
          placeholder="Search knowledge articles, guides, and enterprise docs..."
          className="flex-1 bg-transparent border-none text-white text-sm focus:outline-none"
        />
        <span className="px-2 py-1 bg-brand-cyan/20 text-brand-cyan text-xs font-semibold rounded-md flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> AI Semantic Search
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {articles.map((art) => (
          <div key={art.id} className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3 flex flex-col justify-between">
            <div>
              <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-xs font-semibold rounded-md">{art.category}</span>
              <h4 className="font-bold text-white text-base mt-2">{art.title}</h4>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs text-text-muted">
              <span>{art.views} Views</span>
              <button className="text-brand-cyan font-semibold flex items-center gap-1 hover:underline">
                Read Article <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
