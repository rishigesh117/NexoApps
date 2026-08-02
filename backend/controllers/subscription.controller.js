/**
 * Subscription Controller
 * NexoApps Platform - Phase 6D (Version 2.4)
 */

const subscriptionService = require('../services/subscription.service');

exports.getSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = subscriptionService.getUserSubscriptions(req.user?.id);
    return res.status(200).json({
      success: true,
      data: subscriptions,
    });
  } catch (err) {
    next(err);
  }
};
