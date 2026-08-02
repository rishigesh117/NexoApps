/**
 * Review Service Layer
 * NexoApps Platform - Storefront App Reviews & AI Code Reviews (v2.2)
 */

import { fetchApi } from './apiClient';
import { AuthService } from './authService';
import { Review, RatingDistributionData, ReviewSortOption, CodeReview, BugReport, DocumentationRecord } from '../types';

export interface GetReviewsParams {
  rating?: number;
  verifiedOnly?: boolean;
  sort?: ReviewSortOption;
  search?: string;
  page?: number;
  limit?: number;
}

export interface ReviewsResponseData {
  reviews: Review[];
  stats: RatingDistributionData;
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
}

export interface PostReviewInput {
  rating: number;
  title: string;
  review: string;
}

export const reviewService = {
  // Fetch app reviews with rating filter, sorting & search
  getReviewsByAppSlug: async (
    slug: string,
    params: GetReviewsParams = {}
  ): Promise<ReviewsResponseData> => {
    const token = AuthService.getStoredAccessToken();
    const query = new URLSearchParams();
    if (params.rating) query.append('rating', String(params.rating));
    if (params.verifiedOnly) query.append('verifiedOnly', 'true');
    if (params.sort) query.append('sort', params.sort);
    if (params.search) query.append('search', params.search);
    if (params.page) query.append('page', String(params.page));
    if (params.limit) query.append('limit', String(params.limit));

    const headers: Record<string, string> = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetchApi<{ success: boolean; data: ReviewsResponseData }>(
      `/reviews/apps/${slug}/reviews?${query.toString()}`,
      { headers }
    );
    return response.data;
  },

  // Post a new review
  createReview: async (slug: string, input: PostReviewInput): Promise<Review> => {
    const token = AuthService.getStoredAccessToken();
    if (!token) {
      throw new Error('Authentication required to submit a review');
    }

    const response = await fetchApi<{ success: boolean; data: Review }>(
      `/reviews/apps/${slug}/reviews`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      }
    );
    return response.data;
  },

  // Update existing review
  updateReview: async (reviewId: string, input: Partial<PostReviewInput>): Promise<Review> => {
    const token = AuthService.getStoredAccessToken();
    if (!token) {
      throw new Error('Authentication required to edit review');
    }

    const response = await fetchApi<{ success: boolean; data: Review }>(
      `/reviews/${reviewId}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      }
    );
    return response.data;
  },

  // Soft delete review
  deleteReview: async (reviewId: string): Promise<boolean> => {
    const token = AuthService.getStoredAccessToken();
    if (!token) {
      throw new Error('Authentication required to delete review');
    }

    const response = await fetchApi<{ success: boolean }>(`/reviews/${reviewId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.success;
  },

  // Toggle review helpful / like
  toggleLikeReview: async (
    reviewId: string
  ): Promise<{ likesCount: number; isLikedByUser: boolean }> => {
    const token = AuthService.getStoredAccessToken();
    if (!token) {
      throw new Error('Authentication required to like reviews');
    }

    const response = await fetchApi<{
      success: boolean;
      data: { likesCount: number; isLikedByUser: boolean };
    }>(`/reviews/${reviewId}/like`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  // Fetch logged in user's review history
  getUserReviews: async (): Promise<Review[]> => {
    const token = AuthService.getStoredAccessToken();
    if (!token) return [];

    try {
      const response = await fetchApi<{ success: boolean; data: Review[] }>(
        '/reviews/user/me',
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data || [];
    } catch {
      return [];
    }
  },
};

// Phase 6B AI Code Reviews & Documentation Functions
export async function getCodeReviews(): Promise<{ reviews: CodeReview[]; bugs: BugReport[] }> {
  const res = await fetchApi<{ success: boolean; data: { reviews: CodeReview[]; bugs: BugReport[] } }>('/code-reviews');
  return res.data || { reviews: [], bugs: [] };
}

export async function getDocs(): Promise<DocumentationRecord[]> {
  const res = await fetchApi<{ success: boolean; data: DocumentationRecord[] }>('/code-reviews/docs');
  return res.data || [];
}

export async function generateDoc(docTitle: string, docType: string): Promise<DocumentationRecord> {
  const res = await fetchApi<{ success: boolean; data: DocumentationRecord }>('/code-reviews/docs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ docTitle, docType }),
  });
  return res.data;
}
