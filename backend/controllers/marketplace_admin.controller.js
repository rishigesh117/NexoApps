/**
 * Marketplace Admin Controller — NexoApps Phase 9C
 */

const marketplaceAnalyticsService = require('../services/marketplace_analytics.service');

const marketplaceAdminController = {
  async getAnalytics(req, res) {
    try {
      const analytics = await marketplaceAnalyticsService.getAnalytics();
      res.json({ success: true, data: analytics });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
};

module.exports = marketplaceAdminController;
