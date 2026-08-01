/**
 * Dynamic Trending Engine Service
 * NexoApps Platform - Phase 4D
 */

const appService = require('./app.service');

class TrendingService {
  calculateTrendingScore(app) {
    const downloads = app.downloads || app.downloadsCount || 100;
    const rating = app.rating || 4.5;
    const reviews = app.totalReviews || 10;
    const favorites = app.favoritesCount || 50;

    // Weight formula: (downloads * 0.4) + (rating * 100) + (reviews * 2) + (favorites * 1.5)
    return Math.round((downloads * 0.4 + rating * 100 + reviews * 2 + favorites * 1.5) * 10) / 10;
  }

  getTrendingApps(period = 'today') {
    const apps = appService.getAllApps();

    const metrics = apps.map((app) => {
      const score = this.calculateTrendingScore(app);
      return {
        appId: app.id,
        app,
        downloads: app.downloads || 1850,
        favorites: app.favoritesCount || 420,
        reviews: app.totalReviews || 48,
        rating: app.rating || 4.9,
        views: (app.downloads || 1850) * 3,
        trendingScore: period === 'today' ? score : period === 'week' ? score * 1.4 : score * 2.1,
        period,
      };
    });

    return metrics.sort((a, b) => b.trendingScore - a.trendingScore);
  }
}

module.exports = new TrendingService();
