import React from 'react';
import { Review } from '../../types';
import { ReviewCard } from './ReviewCard';
import { ReviewSkeleton } from './ReviewSkeleton';
import { EmptyReviewState } from './EmptyReviewState';

interface ReviewListProps {
  reviews: Review[];
  isLoading: boolean;
  filterActive?: boolean;
  onWriteReviewClick?: () => void;
  onEditReview?: (review: Review) => void;
  onDeleteReview?: (reviewId: string) => void;
  onAuthRequired?: () => void;
  total?: number;
  page?: number;
  onPageChange?: (page: number) => void;
}

export const ReviewList: React.FC<ReviewListProps> = ({
  reviews,
  isLoading,
  filterActive = false,
  onWriteReviewClick,
  onEditReview,
  onDeleteReview,
  onAuthRequired,
  total = 0,
  page = 1,
  onPageChange,
}) => {
  if (isLoading) {
    return (
      <div className="space-y-4 my-4">
        {[1, 2, 3].map((n) => (
          <ReviewSkeleton key={n} />
        ))}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <EmptyReviewState
        onWriteReviewClick={onWriteReviewClick}
        filterActive={filterActive}
      />
    );
  }

  return (
    <div className="space-y-4 my-4">
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          review={review}
          onEdit={onEditReview}
          onDelete={onDeleteReview}
          onAuthRequired={onAuthRequired}
        />
      ))}
    </div>
  );
};
