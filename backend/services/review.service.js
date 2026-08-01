/**
 * Review Service Layer
 * NexoApps Platform - Phase 3D
 */

const appService = require('./app.service');

class ReviewService {
  constructor() {
    // Initial seeded reviews for demonstration
    this.reviews = [
      {
        id: 'rev-batlytics-1',
        appId: 'app-batlytics-001',
        appSlug: 'batlytics-cricket-scoring',
        appTitle: 'Batlytics',
        appIcon: '/images/apps/batlytics/icon.png',
        userId: 'demo-user-1',
        userName: 'Alex Turner',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        rating: 5,
        title: 'Outstanding scoring precision!',
        review: 'The Manhattan charts and instant PDF export saved our local tournament. Extremely fast ball-by-ball logging with zero lag.',
        isVerified: true,
        likesCount: 14,
        likedBy: ['demo-user-2'],
        createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
        updatedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
        isDeleted: false,
        adminReply: {
          message: 'Thank you Alex! We are adding wagon-wheel analytics in the upcoming update.',
          repliedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        },
      },
      {
        id: 'rev-batlytics-2',
        appId: 'app-batlytics-001',
        appSlug: 'batlytics-cricket-scoring',
        appTitle: 'Batlytics',
        appIcon: '/images/apps/batlytics/icon.png',
        userId: 'demo-user-2',
        userName: 'Priya Sharma',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
        rating: 4,
        title: 'Very clean UI & smooth performance',
        review: 'Great app for scoring. Would love to see cloud backup sync added in the next release!',
        isVerified: true,
        likesCount: 8,
        likedBy: [],
        createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
        updatedAt: new Date(Date.now() - 86400000 * 7).toISOString(),
        isDeleted: false,
      },
    ];
  }

  // Get reviews for an application with filtering, sorting & search
  getReviewsByAppSlug(appSlug, options = {}) {
    const {
      rating,
      verifiedOnly = false,
      sort = 'newest',
      search = '',
      currentUserId = null,
      page = 1,
      limit = 10,
    } = options;

    let filtered = this.reviews.filter(
      (r) => r.appSlug === appSlug && !r.isDeleted
    );

    // Rating filter (1-5 stars)
    if (rating && Number(rating) >= 1 && Number(rating) <= 5) {
      filtered = filtered.filter((r) => r.rating === Number(rating));
    }

    // Verified only filter
    if (verifiedOnly === 'true' || verifiedOnly === true) {
      filtered = filtered.filter((r) => r.isVerified);
    }

    // Text search query
    if (search && search.trim() !== '') {
      const query = search.trim().toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.title.toLowerCase().includes(query) ||
          r.review.toLowerCase().includes(query) ||
          r.userName.toLowerCase().includes(query)
      );
    }

    // Sorting
    filtered.sort((a, b) => {
      if (sort === 'oldest') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      if (sort === 'highest') {
        return b.rating - a.rating;
      }
      if (sort === 'helpful') {
        return b.likesCount - a.likesCount;
      }
      // Default: newest
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    // Format with likedBy flag
    const items = filtered.map((r) => ({
      ...r,
      isLikedByUser: currentUserId ? (r.likedBy || []).includes(currentUserId) : false,
    }));

    const startIndex = (page - 1) * limit;
    const paginatedItems = items.slice(startIndex, startIndex + limit);

    return {
      reviews: paginatedItems,
      total: items.length,
      page: Number(page),
      limit: Number(limit),
    };
  }

  // Calculate rating distribution & stats for an app
  getRatingDistribution(appSlug) {
    const appReviews = this.reviews.filter(
      (r) => r.appSlug === appSlug && !r.isDeleted
    );
    const total = appReviews.length;
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

    if (total === 0) {
      return { average: 0, total: 0, distribution };
    }

    let sum = 0;
    appReviews.forEach((r) => {
      sum += r.rating;
      if (distribution[r.rating] !== undefined) {
        distribution[r.rating] += 1;
      }
    });

    const average = Number((sum / total).toFixed(1));

    return {
      average,
      total,
      distribution,
    };
  }

  // Create a new review
  createReview(userId, userName, userAvatar, appSlug, data) {
    const app = appService.getAppBySlug(appSlug);
    if (!app) {
      throw new Error('Application not found');
    }

    const rating = Number(data.rating);
    if (!rating || rating < 1 || rating > 5) {
      throw new Error('Rating must be an integer between 1 and 5 stars');
    }

    const title = (data.title || '').trim();
    const reviewText = (data.review || data.comment || '').trim();

    if (!title || !reviewText) {
      throw new Error('Review title and content are required');
    }

    // Check if user already reviewed this app
    const existing = this.reviews.find(
      (r) => r.appSlug === appSlug && r.userId === userId && !r.isDeleted
    );
    if (existing) {
      throw new Error('You have already submitted a review for this app. You can edit your existing review.');
    }

    const newReview = {
      id: `rev-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      appId: app.id,
      appSlug: app.slug,
      appTitle: app.title,
      appIcon: app.iconUrl,
      userId,
      userName: userName || 'NexoApps Member',
      userAvatar: userAvatar || '',
      rating,
      title,
      review: reviewText,
      comment: reviewText,
      isVerified: true,
      likesCount: 0,
      likedBy: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isDeleted: false,
    };

    this.reviews.unshift(newReview);

    // Update app rating stats in app.service
    this.syncAppRatingStats(app.slug);

    return newReview;
  }

  // Update existing review
  updateReview(userId, reviewId, data) {
    const review = this.reviews.find((r) => r.id === reviewId && !r.isDeleted);
    if (!review) {
      throw new Error('Review not found');
    }

    if (review.userId !== userId) {
      throw new Error('Unauthorized to modify this review');
    }

    if (data.rating) {
      const rating = Number(data.rating);
      if (rating >= 1 && rating <= 5) {
        review.rating = rating;
      }
    }

    if (data.title && data.title.trim()) {
      review.title = data.title.trim();
    }

    if (data.review || data.comment) {
      const text = (data.review || data.comment).trim();
      if (text) {
        review.review = text;
        review.comment = text;
      }
    }

    review.updatedAt = new Date().toISOString();
    this.syncAppRatingStats(review.appSlug);

    return review;
  }

  // Soft delete review
  deleteReview(userId, reviewId) {
    const review = this.reviews.find((r) => r.id === reviewId && !r.isDeleted);
    if (!review) {
      throw new Error('Review not found');
    }

    if (review.userId !== userId) {
      throw new Error('Unauthorized to delete this review');
    }

    review.isDeleted = true;
    review.updatedAt = new Date().toISOString();

    this.syncAppRatingStats(review.appSlug);
    return { success: true, message: 'Review deleted successfully' };
  }

  // Toggle review helpful / like
  toggleLikeReview(userId, reviewId) {
    const review = this.reviews.find((r) => r.id === reviewId && !r.isDeleted);
    if (!review) {
      throw new Error('Review not found');
    }

    if (!review.likedBy) {
      review.likedBy = [];
    }

    const index = review.likedBy.indexOf(userId);
    let isLiked = false;

    if (index > -1) {
      review.likedBy.splice(index, 1);
      review.likesCount = Math.max(0, review.likesCount - 1);
      isLiked = false;
    } else {
      review.likedBy.push(userId);
      review.likesCount += 1;
      isLiked = true;
    }

    return {
      reviewId,
      likesCount: review.likesCount,
      isLikedByUser: isLiked,
    };
  }

  // Get user's created reviews across all apps
  getUserReviews(userId) {
    return this.reviews.filter((r) => r.userId === userId && !r.isDeleted);
  }

  // Sync app average rating and review count with app.service
  syncAppRatingStats(appSlug) {
    const app = appService.getAppBySlug(appSlug);
    if (app) {
      const stats = this.getRatingDistribution(appSlug);
      app.rating = stats.average;
      app.totalReviews = stats.total;
    }
  }
}

module.exports = new ReviewService();
