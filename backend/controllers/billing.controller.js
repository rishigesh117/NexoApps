/**
 * Billing Controller
 * NexoApps Platform - Phase 7A (Version 3.0)
 */

const billingService = require('../services/billing.service');
const paymentService = require('../services/payment.service');
const usageService = require('../services/usage.service');

exports.getBillingOverview = async (req, res, next) => {
  try {
    const overview = billingService.getBillingOverview(req.query.tenantId);
    const paymentMethods = paymentService.getPaymentMethods(req.query.tenantId);
    const usage = usageService.getUsageRecords(req.query.tenantId);
    return res.status(200).json({
      success: true,
      data: { overview, paymentMethods, usage },
    });
  } catch (err) {
    next(err);
  }
};
