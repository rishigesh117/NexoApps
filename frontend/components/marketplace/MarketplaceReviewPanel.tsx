import React from 'react';
import { MessageSquare, Star } from 'lucide-react';

export const MarketplaceReviewPanel: React.FC = () => {
  const reviews = [
    { id: '1', user: 'DevOps Lead', rating: 5, comment: 'Autonomous Kubernetes Agent solved pod memory leaks automatically in production.' },
    { id: '2', user: 'Security Engineer', rating: 5, comment: 'OWASP Security dataset fine-tuned our vulnerability scan model with 99% accuracy.' }
  ];

  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
      <h3 className="text-base font-bold text-white flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-brand-cyan" />
        Community Reviews & Ratings
      </h3>
      <div className="space-y-3">
        {reviews.map((r) => (
          <div key={r.id} className="p-4 rounded-2xl bg-surface-100 border border-white/10 text-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white">{r.user}</span>
              <span className="text-amber-400 font-bold flex items-center gap-1"><Star className="w-3 h-3 fill-amber-400" /> {r.rating}.0</span>
            </div>
            <p className="text-text-secondary">{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
