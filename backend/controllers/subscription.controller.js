/**
 * Subscription Controller — NexoApps Phase 10A
 */

const subscriptionService = require('../services/subscription.service');

class SubscriptionController {
  async getPlans(req, res) {
    try {
      const plans = await subscriptionService.getPlans();
      res.json({ success: true, data: plans });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getCurrentSubscription(req, res) {
    try {
      const sub = await subscriptionService.getUserSubscription(req.user?.id || 'user-admin');
      res.json({ success: true, data: sub });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async subscribe(req, res) {
    try {
      const { planId } = req.body;
      const sub = await subscriptionService.subscribe(req.user?.id || 'user-admin', planId);
      res.json({ success: true, data: sub });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new SubscriptionController();
