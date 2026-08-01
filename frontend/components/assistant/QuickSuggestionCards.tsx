import React from 'react';
import { Sparkles, Upload, Search, BarChart2, HelpCircle, Users, Shield } from 'lucide-react';

const suggestions = [
  { icon: <Sparkles className="w-3.5 h-3.5" />, label: 'Tell me about Batlytics', query: 'Tell me about Batlytics cricket scoring app' },
  { icon: <Upload className="w-3.5 h-3.5" />, label: 'How do I upload an APK?', query: 'How do I upload an APK using the Owner Upload Portal?' },
  { icon: <Search className="w-3.5 h-3.5" />, label: 'How does AI Search work?', query: 'How does the global AI Search engine work?' },
  { icon: <BarChart2 className="w-3.5 h-3.5" />, label: 'View Analytics Guide', query: 'Explain the Enterprise Analytics Dashboard' },
  { icon: <Users className="w-3.5 h-3.5" />, label: 'Developer Registration', query: 'How do I become a verified developer studio?' },
  { icon: <Shield className="w-3.5 h-3.5" />, label: 'Platform Health Check', query: 'How do I run a platform health check?' },
];

interface QuickSuggestionCardsProps {
  onSelect: (query: string) => void;
}

export const QuickSuggestionCards: React.FC<QuickSuggestionCardsProps> = ({ onSelect }) => {
  return (
    <div className="space-y-2">
      <p className="text-[10px] text-text-muted font-semibold uppercase tracking-wider px-1">Suggested Questions</p>
      <div className="grid grid-cols-2 gap-2">
        {suggestions.map((s) => (
          <button
            key={s.label}
            type="button"
            onClick={() => onSelect(s.query)}
            className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-cyan/40 text-[11px] text-text-secondary hover:text-white transition-all text-left"
          >
            <span className="text-brand-cyan shrink-0">{s.icon}</span>
            <span className="line-clamp-2 leading-tight">{s.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
