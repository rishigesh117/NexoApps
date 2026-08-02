/**
 * API Gateway Controller
 * NexoApps Platform - Phase 7B (Version 3.1)
 */

const apiGatewayService = require('../services/api_gateway.service');
const rateLimitService = require('../services/rate_limit.service');

exports.getStatus = async (req, res, next) => {
  try {
    const status = apiGatewayService.getGatewayStatus();
    const rateLimits = rateLimitService.getRateLimits();
    return res.status(200).json({
      success: true,
      data: { status, rateLimits },
    });
  } catch (err) {
    next(err);
  }
};
