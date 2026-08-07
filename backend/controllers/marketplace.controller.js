/**
 * Marketplace Controller — NexoApps Phase 9C
 */

const marketplaceService = require('../services/marketplace.service');
const marketplaceSearchService = require('../services/marketplace_search.service');
const recommendationService = require('../services/recommendation.service');
const marketplaceReviewService = require('../services/marketplace_review.service');

const marketplaceController = {
  async listItems(req, res) {
    try {
      const { type, category, query, pricingModel } = req.query;
      let items;
      if (query || pricingModel) {
        items = await marketplaceSearchService.searchMarketplace(query, type, category, pricingModel);
      } else {
        items = await marketplaceService.listItems(type, category);
      }
      res.json({ success: true, data: items });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async getItemById(req, res) {
    try {
      const item = await marketplaceService.getItemById(req.params.id);
      if (!item) return res.status(404).json({ success: false, error: 'Marketplace item not found' });
      res.json({ success: true, data: item });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async createItem(req, res) {
    try {
      const item = await marketplaceService.createItem(req.body);
      res.status(201).json({ success: true, data: item });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async listCategories(req, res) {
    try {
      const categories = await marketplaceService.listCategories();
      res.json({ success: true, data: categories });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async getRecommendations(req, res) {
    try {
      const recs = await recommendationService.getRecommendations();
      res.json({ success: true, data: recs });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async getReviews(req, res) {
    try {
      const reviews = await marketplaceReviewService.getReviewsByItemId(req.params.id);
      res.json({ success: true, data: reviews });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async addReview(req, res) {
    try {
      const review = await marketplaceReviewService.addReview({
        ...req.body,
        itemId: req.params.id,
        userId: req.user?.id || req.body.userId
      });
      res.status(201).json({ success: true, data: review });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
};

module.exports = marketplaceController;
