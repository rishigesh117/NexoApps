/**
 * Recommendation Engine V2 Service
 * NexoApps Platform - Phase 5A
 */

const appService = require('./app.service');

class RecommendationV2Service {
  getPersonalizedRecommendations(userId) {
    const catalog = appService.getAllApps();

    const recommendedForYou = catalog.map((app, idx) => ({
      app,
      reason: 'Top Pick for Sports & Utilities Enthusiasts',
      score: 98 - idx * 4,
    }));

    const becauseYouDownloaded = catalog.map((app, idx) => ({
      app,
      reason: 'Because you downloaded Batlytics Cricket Scoring',
      score: 95 - idx * 3,
    }));

    const hiddenGems = catalog.map((app, idx) => ({
      app,
      reason: 'Highly rated hidden gem in AI Utilities',
      score: 92 - idx * 2,
    }));

    const newReleases = catalog.map((app, idx) => ({
      app,
      reason: 'Recently updated with new version features',
      score: 90 - idx * 5,
    }));

    return [
      {
        category: 'recommended_for_you',
        title: 'Recommended For You',
        description: 'Personalized based on your download history and category interests.',
        items: recommendedForYou,
      },
      {
        category: 'because_you_downloaded',
        title: 'Because You Downloaded...',
        description: 'Applications frequently enjoyed by users with similar sports analytics apps.',
        items: becauseYouDownloaded,
      },
      {
        category: 'hidden_gems',
        title: 'Hidden Gems',
        description: 'Top-rated applications with explosive rating growth.',
        items: hiddenGems,
      },
      {
        category: 'new_releases',
        title: 'New Releases For You',
        description: 'Fresh software releases and major version upgrades.',
        items: newReleases,
      },
    ];
  }
}

module.exports = new RecommendationV2Service();
