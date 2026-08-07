/**
 * Recommendation Service — NexoApps Phase 9C
 * AI personalized package recommendations, trending items, and collections.
 */

const marketplaceService = require('./marketplace.service');

class RecommendationService {
  async getRecommendations() {
    const items = await marketplaceService.listItems();
    return {
      trending: items.filter(i => i.isFeatured),
      personalized: items,
      topRated: items.sort((a, b) => b.ratingAvg - a.ratingAvg).slice(0, 3)
    };
  }
}

module.exports = new RecommendationService();
