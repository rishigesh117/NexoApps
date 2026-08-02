/**
 * SaaS Subscription Controller
 * NexoApps Platform - Phase 7A (Version 3.0)
 */

const saasSubscriptionService = require('../services/saas_subscription.service');

exports.getPlans = async (req, res, next) => {
  try {
    const plans = saasSubscriptionService.getPlans();
    return res.status(200).json({
      success: true,
      data: plans,
    });
  } catch (err) {
    next(err);
  }
};
