/**
 * Seller Controller — NexoApps Phase 10A
 */

const sellerService = require('../services/seller.service');

class SellerController {
  async getAccount(req, res) {
    try {
      const seller = await sellerService.getSellerAccount(req.user?.id || 'user-admin');
      res.json({ success: true, data: seller });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getPayouts(req, res) {
    try {
      const payouts = await sellerService.getPayouts();
      res.json({ success: true, data: payouts });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new SellerController();
