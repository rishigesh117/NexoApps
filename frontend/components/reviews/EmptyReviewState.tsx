import React from 'react';
import { MessageSquarePlus, Star } from 'lucide-react';

interface EmptyReviewStateProps {
  onWriteReviewClick?: () => void;
  filterActive?: boolean;
}

export const EmptyReviewState: React.FC<EmptyReviewStateProps> = ({
  onWriteReviewClick,
  filterActive = false,
}) => {
  return (
    <div className="glass-card p-10 rounded-3xl border border-white/10 text-center space-y-4 my-6">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-cyan/20 to-brand-violet/20 border border-brand-cyan/30 flex items-center justify-center mx-auto shadow-glow-cyan">
        <Star className="w-8 h-8 text-brand-cyan" />
      </div>

      <div className="space-y-1 max-w-md mx-auto">
        <h3 className="text-lg font-bold text-white">
          {filterActive ? 'No matching reviews found' : 'Be the first to review!'}
        </h3>
        <p className="text-xs text-text-secondary">
          {filterActive
            ? 'Try adjusting your rating filters or search keywords.'
            : 'Share your experience with the community and help others discover great features.'}
        </p>
      </div>

      {onWriteReviewClick && !filterActive && (
        <button
          onClick={onWriteReviewClick}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-brand-cyan to-brand-violet hover:shadow-glow-cyan transition-all"
        >
          <MessageSquarePlus className="w-4 h-4" />
          <span>Write a Review</span>
        </button>
      )}
    </div>
  );
};
