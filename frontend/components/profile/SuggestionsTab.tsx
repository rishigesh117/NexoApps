import React from 'react';
import { MessageSquare, Clock, CheckCircle2, MessageCircle } from 'lucide-react';

interface SuggestionItem {
  id: string;
  title: string;
  category: string;
  status: 'PENDING' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED';
  submittedDate: string;
  adminReply?: string;
}

export const SuggestionsTab: React.FC = () => {
  const suggestions: SuggestionItem[] = [
    {
      id: 'sug-101',
      title: 'Dark Mode Theme & Multi-language Export Support in Batlytics',
      category: 'Feature Request',
      status: 'UNDER_REVIEW',
      submittedDate: '2026-07-28',
      adminReply: 'Thanks for your feedback! Our development team is actively evaluating this for v1.2.',
    },
  ];

  const getStatusBadge = (status: SuggestionItem['status']) => {
    switch (status) {
      case 'APPROVED':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Approved</span>;
      case 'UNDER_REVIEW':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30">Under Review</span>;
      case 'REJECTED':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30">Declined</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">Pending</span>;
    }
  };

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 text-left">
      <div className="pb-4 border-b border-white/10">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-brand-cyan" /> My Feature Suggestions
        </h3>
        <p className="text-xs text-text-muted mt-0.5">
          Feature requests and platform improvements submitted by you
        </p>
      </div>

      {suggestions.length > 0 ? (
        <div className="space-y-4">
          {suggestions.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-surface-100/80 border border-white/10 space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-surface-200 text-text-muted border border-white/10">
                    {item.category}
                  </span>
                  {getStatusBadge(item.status)}
                </div>

                <span className="text-[10px] text-text-muted flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Submitted on {item.submittedDate}
                </span>
              </div>

              <h4 className="text-sm font-bold text-white">{item.title}</h4>

              {item.adminReply && (
                <div className="p-3.5 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 text-xs space-y-1.5 mt-2">
                  <div className="flex items-center gap-1.5 text-brand-cyan font-bold text-[11px]">
                    <MessageCircle className="w-3.5 h-3.5" /> NexoApps Team Reply:
                  </div>
                  <p className="text-text-secondary leading-relaxed text-[11px]">{item.adminReply}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        /* Empty State UI */
        <div className="py-12 flex flex-col items-center text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-surface-200 border border-white/10 flex items-center justify-center text-text-muted">
            <MessageSquare className="w-8 h-8" />
          </div>
          <h4 className="text-lg font-bold text-white">No Suggestions Submitted</h4>
          <p className="text-xs text-text-muted max-w-xs">
            Have an idea for a new feature or app? Submit a suggestion to shape our roadmap.
          </p>
        </div>
      )}
    </div>
  );
};
