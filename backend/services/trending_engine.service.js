/**
 * Advanced Trending Engine V2 Service
 * NexoApps Platform - Phase 5A
 */

const appService = require('./app.service');

class TrendingEngineService {
  calculateTrendingLeaderboard(period = 'today') {
    const apps = appService.getAllApps();
    const periodMultiplier = period === 'today' ? 1.0 : period === 'week' ? 1.5 : 2.0;

    return apps
      .map((app) => {
        const downloads = app.downloads || 142000;
        const rating = app.rating || 4.9;
        const reviews = app.totalReviews || 342;
        const favorites = app.favoritesCount || 120;
        const views = downloads * 1.5;

        const trendingScore = Math.round(
          (downloads * 0.4 + rating * 100 + reviews * 2 + favorites * 1.5) * periodMultiplier
        );

        return {
          appId: app.id,
          app,
          downloads,
          favorites,
          reviews,
          rating,
          views,
          trendingScore,
          period,
        };
      })
      .sort((a, b) => b.trendingScore - a.trendingScore);
  }
}

module.exports = new TrendingEngineService();
