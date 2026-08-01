import React from 'react';
import { Review } from '../../types';
import { Star, Trash2, ShieldCheck } from 'lucide-react';

interface RecentReviewsProps {
  reviews: Review[];
  onModerate?: (reviewId: string, action: string) => void;
}

export const RecentReviews: React.FC<RecentReviewsProps> = ({ reviews, onModerate }) => {
  const activeReviews = reviews.filter((r) => !r.isDeleted).slice(0, 5);

  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 text-left">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
          <h3 className="text-base font-bold text-white">Community Reviews Moderation</h3>
        </div>
        <span className="text-xs text-text-muted">{activeReviews.length} Active</span>
      </div>

      {activeReviews.length === 0 ? (
        <p className="text-xs text-text-muted py-4 text-center">No active reviews requiring moderation.</p>
      ) : (
        <div className="space-y-3">
          {activeReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start justify-between gap-3 hover:border-white/20 transition-all"
            >
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">{rev.userName}</span>
                  <div className="flex items-center text-amber-400 font-bold text-[11px]">
                    ★ {rev.rating}.0
                  </div>
                  {rev.isVerified && (
                    <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-0.5">
                      <ShieldCheck className="w-3 h-3" /> Verified
                    </span>
                  )}
                </div>
                <h5 className="font-semibold text-brand-cyan">{rev.title}</h5>
                <p className="text-text-secondary italic leading-relaxed line-clamp-2">
                  "{rev.review || rev.comment}"
                </p>
              </div>

              {onModerate && (
                <button
                  onClick={() => onModerate(rev.id, 'delete')}
                  className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/10 text-text-muted hover:text-rose-400 transition-colors shrink-0"
                  title="Delete Review"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
