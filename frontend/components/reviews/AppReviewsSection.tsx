import React, { useState, useEffect } from 'react';
import { Star, MessageSquarePlus, Sparkles } from 'lucide-react';
import { AppItem, Review, RatingDistributionData, ReviewSortOption } from '../../types';
import { reviewService } from '../../services/reviewService';
import { useAuth } from '../../context/AuthContext';
import { RatingDistribution } from './RatingDistribution';
import { ReviewFilters } from './ReviewFilters';
import { ReviewList } from './ReviewList';
import { ReviewForm } from './ReviewForm';

interface AppReviewsSectionProps {
  app: AppItem;
  onAuthRequired?: () => void;
}

export const AppReviewsSection: React.FC<AppReviewsSectionProps> = ({
  app,
  onAuthRequired,
}) => {
  const { user } = useAuth();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<RatingDistributionData>({
    average: app.rating || 4.8,
    total: app.totalReviews || 12,
    distribution: { 5: 8, 4: 3, 3: 1, 2: 0, 1: 0 },
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Filters & Sorting state
  const [sort, setSort] = useState<ReviewSortOption>('newest');
  const [selectedStar, setSelectedStar] = useState<number | null>(null);
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);

  // Modal State
  const [isWriteModalOpen, setIsWriteModalOpen] = useState<boolean>(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);

  const fetchReviews = async () => {
    setIsLoading(true);
    try {
      const res = await reviewService.getReviewsByAppSlug(app.slug, {
        rating: selectedStar || undefined,
        verifiedOnly,
        sort,
        search: searchQuery,
        page,
        limit: 10,
      });

      setReviews(res.reviews || []);
      setStats(res.stats);
      setTotalItems(res.pagination.total);
    } catch {
      // Fallback
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [app.slug, sort, selectedStar, verifiedOnly, searchQuery, page]);

  const handleWriteClick = () => {
    if (!user) {
      if (onAuthRequired) onAuthRequired();
      return;
    }
    setEditingReview(null);
    setIsWriteModalOpen(true);
  };

  const handleEditReview = (review: Review) => {
    setEditingReview(review);
    setIsWriteModalOpen(true);
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!window.confirm('Are you sure you want to delete your review?')) return;
    try {
      await reviewService.deleteReview(reviewId);
      fetchReviews();
    } catch (err: any) {
      alert(err.message || 'Failed to delete review');
    }
  };

  const handleReviewSuccess = (savedReview: Review) => {
    setIsWriteModalOpen(false);
    setEditingReview(null);
    fetchReviews();
  };

  const isFilterActive =
    selectedStar !== null || verifiedOnly || searchQuery.trim() !== '';

  return (
    <div id="reviews-section" className="space-y-6 text-left">
      
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-extrabold text-white">Ratings & Reviews</h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30">
              {stats.total}
            </span>
          </div>
          <p className="text-xs text-text-secondary">
            User ratings, verified feedbacks, and community reviews for {app.title}
          </p>
        </div>

        <button
          onClick={handleWriteClick}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-extrabold text-slate-950 bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet hover:shadow-glow-cyan transition-all transform hover:-translate-y-0.5"
        >
          <MessageSquarePlus className="w-4 h-4" />
          <span>Write a Review</span>
        </button>
      </div>

      {/* 1. Overall Rating Score & Distribution Bar Breakdown */}
      <RatingDistribution
        stats={stats}
        selectedStar={selectedStar}
        onFilterByStar={setSelectedStar}
      />

      {/* 2. Review Filter & Sort Controls Bar */}
      <ReviewFilters
        sort={sort}
        onSortChange={setSort}
        selectedStar={selectedStar}
        onStarChange={setSelectedStar}
        verifiedOnly={verifiedOnly}
        onVerifiedChange={setVerifiedOnly}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* 3. Review Items List */}
      <ReviewList
        reviews={reviews}
        isLoading={isLoading}
        filterActive={isFilterActive}
        onWriteReviewClick={handleWriteClick}
        onEditReview={handleEditReview}
        onDeleteReview={handleDeleteReview}
        onAuthRequired={onAuthRequired}
        total={totalItems}
        page={page}
        onPageChange={setPage}
      />

      {/* Write / Edit Review Modal */}
      {isWriteModalOpen && (
        <ReviewForm
          appSlug={app.slug}
          appTitle={app.title}
          initialReview={editingReview}
          onClose={() => {
            setIsWriteModalOpen(false);
            setEditingReview(null);
          }}
          onSuccess={handleReviewSuccess}
        />
      )}
    </div>
  );
};
