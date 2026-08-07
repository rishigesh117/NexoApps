/**
 * Marketplace Review Service — NexoApps Phase 9C
 * Community reviews, star ratings, and moderation logic.
 */

const { v4: uuidv4 } = require('uuid');

class MarketplaceReviewService {
  constructor() {
    this.reviews = [
      { id: 'rev-1', itemId: 'item-agent-1', userId: 'user-dev-1', rating: 5, reviewText: 'Outstanding DevOps Kubernetes agent! Solved our pod memory leak within seconds.', isApproved: true, createdAt: new Date(Date.now() - 86400000).toISOString() },
      { id: 'rev-2', itemId: 'item-plugin-1', userId: 'user-dev-2', rating: 5, reviewText: 'The PGVector similarity search speed is unbelievable.', isApproved: true, createdAt: new Date().toISOString() }
    ];
  }

  async getReviewsByItemId(itemId) {
    return this.reviews.filter(r => r.itemId === itemId);
  }

  async addReview(data) {
    const rev = {
      id: `rev-${uuidv4().substring(0, 8)}`,
      itemId: data.itemId,
      userId: data.userId || 'user-owner',
      rating: data.rating || 5,
      reviewText: data.reviewText || '',
      isApproved: true,
      createdAt: new Date().toISOString()
    };
    this.reviews.push(rev);
    return rev;
  }
}

module.exports = new MarketplaceReviewService();
