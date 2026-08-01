/**
 * Favorite & Wishlist Service Layer
 * NexoApps Platform - Phase 3D
 */

const appService = require('./app.service');

class FavoriteService {
  constructor() {
    this.favorites = [
      {
        id: 'fav-demo-1',
        userId: 'demo-user-1',
        appId: 'app-batlytics-001',
        appSlug: 'batlytics-cricket-scoring',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      },
    ];
  }

  // Get user's favorited apps / wishlist
  getUserFavorites(userId) {
    const userFavs = this.favorites.filter((f) => f.userId === userId);
    return userFavs.map((f) => {
      const app = appService.getAppBySlug(f.appSlug);
      return {
        id: f.id,
        userId: f.userId,
        appId: f.appId,
        appSlug: f.appSlug,
        createdAt: f.createdAt,
        app: app || null,
      };
    });
  }

  // Check if an app is favorited by user
  checkIsFavorite(userId, appSlug) {
    if (!userId) return false;
    return this.favorites.some(
      (f) => f.userId === userId && f.appSlug === appSlug
    );
  }

  // Add app to user favorites / wishlist
  addFavorite(userId, appSlug) {
    const app = appService.getAppBySlug(appSlug);
    if (!app) {
      throw new Error('Application not found');
    }

    const existing = this.favorites.find(
      (f) => f.userId === userId && f.appSlug === appSlug
    );
    if (existing) {
      return {
        success: true,
        message: 'App is already in your favorites',
        favorite: existing,
      };
    }

    const newFav = {
      id: `fav-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      userId,
      appId: app.id,
      appSlug: app.slug,
      createdAt: new Date().toISOString(),
    };

    this.favorites.unshift(newFav);

    return {
      success: true,
      message: 'App added to your favorites',
      favorite: {
        ...newFav,
        app,
      },
    };
  }

  // Remove app from user favorites / wishlist
  removeFavorite(userId, appSlug) {
    const index = this.favorites.findIndex(
      (f) => f.userId === userId && f.appSlug === appSlug
    );

    if (index > -1) {
      this.favorites.splice(index, 1);
    }

    return {
      success: true,
      message: 'App removed from your favorites',
    };
  }
}

module.exports = new FavoriteService();
