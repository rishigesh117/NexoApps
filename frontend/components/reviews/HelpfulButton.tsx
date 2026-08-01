import React, { useState } from 'react';
import { ThumbsUp } from 'lucide-react';
import { reviewService } from '../../services/reviewService';
import { useAuth } from '../../context/AuthContext';

interface HelpfulButtonProps {
  reviewId: string;
  initialLikesCount: number;
  initialIsLiked?: boolean;
  onAuthRequired?: () => void;
}

export const HelpfulButton: React.FC<HelpfulButtonProps> = ({
  reviewId,
  initialLikesCount,
  initialIsLiked = false,
  onAuthRequired,
}) => {
  const { user } = useAuth();
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (!user) {
      if (onAuthRequired) onAuthRequired();
      return;
    }

    if (isLoading) return;

    // Optimistic UI Update
    const nextIsLiked = !isLiked;
    const nextCount = nextIsLiked ? likesCount + 1 : Math.max(0, likesCount - 1);

    setIsLiked(nextIsLiked);
    setLikesCount(nextCount);
    setIsLoading(true);

    try {
      const res = await reviewService.toggleLikeReview(reviewId);
      setLikesCount(res.likesCount);
      setIsLiked(res.isLikedByUser);
    } catch (err) {
      // Revert state on error
      setIsLiked(isLiked);
      setLikesCount(likesCount);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      aria-label="Mark review as helpful"
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
        isLiked
          ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30 shadow-glow-cyan'
          : 'bg-white/5 text-text-secondary hover:text-white hover:bg-white/10 border border-white/10'
      }`}
    >
      <ThumbsUp className={`w-3.5 h-3.5 ${isLiked ? 'fill-brand-cyan' : ''}`} />
      <span>Helpful</span>
      {likesCount > 0 && <span className="font-semibold">({likesCount})</span>}
    </button>
  );
};
