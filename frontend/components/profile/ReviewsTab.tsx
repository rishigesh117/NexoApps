import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Star, Edit3, Trash2, MessageSquareOff, ThumbsUp, ShieldCheck } from 'lucide-react';
import { Review } from '../../types';
import { reviewService } from '../../services/reviewService';
import { ReviewForm } from '../reviews/ReviewForm';

export const ReviewsTab: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [editingReview, setEditingReview] = useState<Review | null>(null);

  const fetchUserReviews = async () => {
    setIsLoading(true);
    try {
      const data = await reviewService.getUserReviews();
      setReviews(data);
    } catch {
      // Fallback
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserReviews();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete your review?')) {
      try {
        await reviewService.deleteReview(id);
        setReviews((prev) => prev.filter((r) => r.id !== id));
      } catch (err: any) {
        alert(err.message || 'Failed to delete review');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-4 animate-pulse">
        <div className="h-6 w-48 bg-white/10 rounded" />
        <div className="space-y-3">
          {[1, 2].map((n) => (
            <div key={n} className="h-32 bg-white/10 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 text-left">
      <div className="pb-4 border-b border-white/10 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-400 fill-amber-400" /> My App Reviews
          </h3>
          <p className="text-xs text-text-muted mt-0.5">
            Manage reviews and ratings you have posted on NexoApps
          </p>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30">
          {reviews.length}
        </span>
      </div>

      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-5 rounded-2xl bg-surface-100/80 border border-white/10 space-y-3 hover:border-white/20 transition-all"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {rev.appIcon && (
                    <div className="w-10 h-10 rounded-xl bg-surface-200 border border-white/15 flex items-center justify-center text-xl shrink-0">
                      {rev.appIcon}
                    </div>
                  )}
                  <div>
                    <Link
                      href={`/app/${rev.appSlug || 'batlytics-cricket-scoring'}`}
                      className="text-sm font-bold text-white hover:text-brand-cyan transition-colors"
                    >
                      {rev.appTitle || 'Batlytics'}
                    </Link>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-3 h-3 ${
                              s <= rev.rating ? 'text-amber-400 fill-amber-400' : 'text-white/20'
                            }`}
                          />
                        ))}
                      </div>
                      {rev.isVerified && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-emerald-400">
                          <ShieldCheck className="w-3 h-3" /> Verified
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingReview(rev)}
                    className="p-2 rounded-xl bg-surface-200 hover:bg-surface-100 text-text-muted hover:text-white transition-colors"
                    title="Edit Review"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(rev.id)}
                    className="p-2 rounded-xl bg-surface-200 hover:bg-red-500/10 text-text-muted hover:text-red-400 transition-colors"
                    title="Delete Review"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <h5 className="text-xs font-bold text-white">{rev.title}</h5>
                <p className="text-xs text-text-secondary leading-relaxed bg-black/20 p-3 rounded-xl border border-white/5">
                  "{rev.review || rev.comment}"
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-text-muted pt-1">
                <div className="flex items-center gap-1 text-brand-cyan">
                  <ThumbsUp className="w-3 h-3" />
                  <span>{rev.likesCount} users found this helpful</span>
                </div>
                <span>
                  Posted on {new Date(rev.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State UI */
        <div className="py-12 flex flex-col items-center text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-surface-200 border border-white/10 flex items-center justify-center text-text-muted">
            <MessageSquareOff className="w-8 h-8" />
          </div>
          <h4 className="text-lg font-bold text-white">No Reviews Yet</h4>
          <p className="text-xs text-text-muted max-w-xs">
            Download and test applications from the app store to share your experience with others.
          </p>
          <Link
            href="/apps"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-brand-cyan to-brand-violet hover:shadow-glow-cyan transition-all mt-2"
          >
            <span>Browse App Store</span>
          </Link>
        </div>
      )}

      {editingReview && (
        <ReviewForm
          appSlug={editingReview.appSlug || 'batlytics-cricket-scoring'}
          appTitle={editingReview.appTitle || 'Application'}
          initialReview={editingReview}
          onClose={() => setEditingReview(null)}
          onSuccess={() => {
            setEditingReview(null);
            fetchUserReviews();
          }}
        />
      )}
    </div>
  );
};
