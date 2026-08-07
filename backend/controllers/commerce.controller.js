/**
 * Commerce Controller — NexoApps Phase 10A
 */

const commerceService = require('../services/commerce.service');
const commerceAnalyticsService = require('../services/commerce_analytics.service');

class CommerceController {
  async getCart(req, res) {
    try {
      const items = await commerceService.getCart(req.user?.id || 'user-admin');
      res.json({ success: true, data: items });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async addToCart(req, res) {
    try {
      const { productId, quantity } = req.body;
      const item = await commerceService.addToCart(req.user?.id || 'user-admin', productId, quantity);
      res.json({ success: true, data: item });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getWishlist(req, res) {
    try {
      const items = await commerceService.getWishlist(req.user?.id || 'user-admin');
      res.json({ success: true, data: items });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getOrders(req, res) {
    try {
      const orders = await commerceService.getOrders(req.user?.id || 'user-admin');
      res.json({ success: true, data: orders });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getAnalytics(req, res) {
    try {
      const metrics = await commerceAnalyticsService.getMetrics();
      res.json({ success: true, data: metrics });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new CommerceController();
