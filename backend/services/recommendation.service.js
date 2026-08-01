/**
 * Personalized Recommendation Engine Service
 * NexoApps Platform - Phase 4D
 */

const appService = require('./app.service');
const trendingService = require('./trending.service');

class RecommendationService {
  getPersonalizedRecommendations(user, limit = 6) {
    const allApps = appService.getAllApps();

    const items = allApps.map((app, idx) => {
      let reason = 'High Community Popularity';
      let score = 90;

      if (app.category === 'Android Apps' || app.category === 'Utilities') {
        reason = 'Based on top category trends';
        score = 98 - idx * 2;
      } else if (app.rating >= 4.8) {
        reason = 'Top-Rated Editors Choice';
        score = 94 - idx * 2;
      } else if (app.isTrending) {
        reason = 'Trending in your region';
        score = 92 - idx * 2;
      }

      const similarApps = allApps.filter((a) => a.id !== app.id && a.category === app.category).slice(0, 3);

      return {
        app,
        reason,
        score,
        similarApps,
      };
    });

    return items.sort((a, b) => b.score - a.score).slice(0, limit);
  }

  getSimilarApps(appSlug, limit = 4) {
    const allApps = appService.getAllApps();
    const targetApp = allApps.find((a) => a.slug === appSlug || a.id === appSlug);
    if (!targetApp) return allApps.slice(0, limit);

    return allApps.filter((a) => a.id !== targetApp.id && a.category === targetApp.category).slice(0, limit);
  }
}

module.exports = new RecommendationService();
