/**
 * Community, Social Discovery & Notification API Service Layer
 * NexoApps Platform - Phase 4D
 */

import { fetchApi } from './apiClient';
import { AuthService } from './authService';
import {
  TrendingMetric,
  RecommendationItem,
  CommunityFeedItem,
  Collection,
  NotificationItem,
  AppItem,
} from '../types';

const getAuthHeader = (): Record<string, string> => {
  const token = AuthService.getStoredAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const communityService = {
  // Trending Apps Leaderboard
  getTrending: async (period: 'today' | 'week' | 'month' = 'today'): Promise<TrendingMetric[]> => {
    const response = await fetchApi<{ success: boolean; data: TrendingMetric[] }>(`/community/trending?period=${period}`);
    return response.data || [];
  },

  // Personalized Recommendations
  getRecommended: async (): Promise<RecommendationItem[]> => {
    const response = await fetchApi<{ success: boolean; data: RecommendationItem[] }>('/community/recommended', {
      headers: getAuthHeader(),
    });
    return response.data || [];
  },

  // Community Activity Feed
  getCommunityFeed: async (): Promise<CommunityFeedItem[]> => {
    const response = await fetchApi<{ success: boolean; data: CommunityFeedItem[] }>('/community/feed');
    return response.data || [];
  },

  // Developer Follow Engine
  getFollowStatus: async (developerId: string): Promise<{ isFollowing: boolean; followersCount: number }> => {
    const response = await fetchApi<{ success: boolean; data: { isFollowing: boolean; followersCount: number } }>(
      `/follow/status/${developerId}`,
      { headers: getAuthHeader() }
    );
    return response.data || { isFollowing: false, followersCount: 1420 };
  },

  followDeveloper: async (developerId: string): Promise<{ isFollowing: boolean; followersCount: number }> => {
    const response = await fetchApi<{ success: boolean; data: { isFollowing: boolean; followersCount: number } }>(
      `/follow/${developerId}`,
      {
        method: 'POST',
        headers: getAuthHeader(),
      }
    );
    return response.data;
  },

  unfollowDeveloper: async (developerId: string): Promise<{ isFollowing: boolean; followersCount: number }> => {
    const response = await fetchApi<{ success: boolean; data: { isFollowing: boolean; followersCount: number } }>(
      `/follow/${developerId}`,
      {
        method: 'DELETE',
        headers: getAuthHeader(),
      }
    );
    return response.data;
  },

  // User Notifications Center
  getNotifications: async (): Promise<{ notifications: NotificationItem[]; unreadCount: number }> => {
    const response = await fetchApi<{ success: boolean; data: { notifications: NotificationItem[]; unreadCount: number } }>(
      '/notifications',
      { headers: getAuthHeader() }
    );
    return response.data || { notifications: [], unreadCount: 0 };
  },

  markNotificationsRead: async (notificationId?: string): Promise<NotificationItem[]> => {
    const response = await fetchApi<{ success: boolean; data: NotificationItem[] }>('/notifications/read', {
      method: 'POST',
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ notificationId }),
    });
    return response.data || [];
  },

  // User App Collections
  getCollections: async (): Promise<Collection[]> => {
    const response = await fetchApi<{ success: boolean; data: Collection[] }>('/collections', {
      headers: getAuthHeader(),
    });
    return response.data || [];
  },

  getCollectionById: async (id: string): Promise<Collection | null> => {
    const response = await fetchApi<{ success: boolean; data: Collection }>(`/collections/${id}`, {
      headers: getAuthHeader(),
    });
    return response.data || null;
  },

  createCollection: async (data: Partial<Collection>): Promise<Collection> => {
    const response = await fetchApi<{ success: boolean; data: Collection }>('/collections', {
      method: 'POST',
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.data;
  },

  updateCollection: async (id: string, data: Partial<Collection>): Promise<Collection> => {
    const response = await fetchApi<{ success: boolean; data: Collection }>(`/collections/${id}`, {
      method: 'PATCH',
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.data;
  },

  deleteCollection: async (id: string): Promise<void> => {
    await fetchApi(`/collections/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader(),
    });
  },

  addAppToCollection: async (collectionId: string, appId: string): Promise<void> => {
    await fetchApi(`/collections/${collectionId}/apps`, {
      method: 'POST',
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ appId }),
    });
  },

  removeAppFromCollection: async (collectionId: string, appId: string): Promise<void> => {
    await fetchApi(`/collections/${collectionId}/apps/${appId}`, {
      method: 'DELETE',
      headers: getAuthHeader(),
    });
  },
};
