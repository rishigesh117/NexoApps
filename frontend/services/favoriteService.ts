/**
 * Favorite & Wishlist Service Layer
 * NexoApps Platform - Phase 3D
 */

import { fetchApi } from './apiClient';
import { AuthService } from './authService';
import { FavoriteItem } from '../types';

export const favoriteService = {
  // Fetch user favorites list
  getUserFavorites: async (): Promise<FavoriteItem[]> => {
    const token = AuthService.getStoredAccessToken();
    if (!token) return [];

    try {
      const response = await fetchApi<{ success: boolean; data: FavoriteItem[] }>(
        '/favorites',
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data || [];
    } catch {
      return [];
    }
  },

  // Check if an app is in user's favorites
  checkIsFavorite: async (slug: string): Promise<boolean> => {
    const token = AuthService.getStoredAccessToken();
    const headers: Record<string, string> = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetchApi<{ success: boolean; data: { isFavorite: boolean } }>(
        `/favorites/apps/${slug}/favorite`,
        { headers }
      );
      return response.data?.isFavorite || false;
    } catch {
      return false;
    }
  },

  // Add app to user favorites / wishlist
  addFavorite: async (slug: string): Promise<FavoriteItem> => {
    const token = AuthService.getStoredAccessToken();
    if (!token) {
      throw new Error('Authentication required to favorite apps');
    }

    const response = await fetchApi<{ success: boolean; data: FavoriteItem }>(
      `/favorites/apps/${slug}/favorite`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  },

  // Remove app from user favorites
  removeFavorite: async (slug: string): Promise<boolean> => {
    const token = AuthService.getStoredAccessToken();
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await fetchApi<{ success: boolean }>(
      `/favorites/apps/${slug}/favorite`,
      {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.success;
  },
};
