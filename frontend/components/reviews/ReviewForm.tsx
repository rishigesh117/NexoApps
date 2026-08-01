import React, { useState, useEffect } from 'react';
import { Star, X, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Review } from '../../types';
import { reviewService } from '../../services/reviewService';

interface ReviewFormProps {
  appSlug: string;
  appTitle?: string;
  initialReview?: Review | null;
  onClose: () => void;
  onSuccess: (review: Review) => void;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({
  appSlug,
  appTitle = 'Application',
  initialReview = null,
  onClose,
  onSuccess,
}) => {
  const [rating, setRating] = useState<number>(initialReview?.rating || 5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [title, setTitle] = useState<string>(initialReview?.title || '');
  const [reviewText, setReviewText] = useState<string>(
    initialReview?.review || initialReview?.comment || ''
  );
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (initialReview) {
      setRating(initialReview.rating);
      setTitle(initialReview.title || '');
      setReviewText(initialReview.review || initialReview.comment || '');
    }
  }, [initialReview]);

  const ratingLabels = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!rating || rating < 1 || rating > 5) {
      setError('Please select a star rating from 1 to 5 stars.');
      return;
    }

    if (!title.trim()) {
      setError('Please enter a brief headline title for your review.');
      return;
    }

    if (!reviewText.trim()) {
      setError('Please write your review feedback.');
      return;
    }

    setIsSubmitting(true);

    try {
      let resultReview: Review;
      if (initialReview) {
        resultReview = await reviewService.updateReview(initialReview.id, {
          rating,
          title: title.trim(),
          review: reviewText.trim(),
        });
      } else {
        resultReview = await reviewService.createReview(appSlug, {
          rating,
          title: title.trim(),
          review: reviewText.trim(),
        });
      }
      onSuccess(resultReview);
    } catch (err: any) {
      setError(err.message || 'Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel w-full max-w-lg p-6 sm:p-8 rounded-3xl border border-white/15 shadow-2xl space-y-6 relative overflow-hidden">
        
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-brand-cyan/20 to-brand-violet/20 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {initialReview ? 'Edit Your Review' : `Rate & Review ${appTitle}`}
              </h3>
              <p className="text-xs text-text-secondary">Share your feedback with the NexoApps community</p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-full text-text-muted hover:text-white hover:bg-white/10 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2.5 text-xs text-rose-300">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Interactive Star Selection */}
          <div className="space-y-2 text-center bg-white/5 p-4 rounded-2xl border border-white/10">
            <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider block">
              Overall Rating
            </label>

            <div className="flex items-center justify-center gap-2 my-2">
              {[1, 2, 3, 4, 5].map((star) => {
                const activeStar = hoverRating || rating;
                const isFilled = star <= activeStar;

                return (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    aria-label={`Rate ${star} out of 5 stars`}
                    className="p-1 transform hover:scale-125 transition-all duration-200 focus:outline-none"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        isFilled
                          ? 'text-amber-400 fill-amber-400 filter drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]'
                          : 'text-white/20 fill-white/5'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <span className="text-xs font-medium text-amber-400">
              {ratingLabels[hoverRating || rating]} ({hoverRating || rating} / 5 Stars)
            </span>
          </div>

          {/* Title Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-text-secondary">Headline Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Incredible performance & slick design!"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-text-muted focus:outline-none focus:border-brand-cyan/50 transition-all"
              maxLength={100}
            />
          </div>

          {/* Review Text Area */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-text-secondary">Detailed Review</label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows={4}
              placeholder="Tell others what you love about this application or suggest improvements..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-xs text-white placeholder-text-muted focus:outline-none focus:border-brand-cyan/50 transition-all resize-none"
              maxLength={1000}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full text-xs font-semibold text-text-secondary hover:text-white hover:bg-white/10 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-brand-cyan to-brand-violet hover:shadow-glow-cyan disabled:opacity-50 transition-all"
            >
              {isSubmitting ? (
                <span>Submitting...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{initialReview ? 'Update Review' : 'Submit Review'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
