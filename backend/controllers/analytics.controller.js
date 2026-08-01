/**
 * Enterprise Analytics Controller
 * NexoApps Platform - Phase 5A
 */

const analyticsEngineService = require('../services/analytics_engine.service');

exports.getOverview = async (req, res, next) => {
  try {
    const metrics = analyticsEngineService.getOverviewMetrics();
    return res.status(200).json({
      success: true,
      data: metrics,
    });
  } catch (err) {
    next(err);
  }
};

exports.getDeveloperAnalytics = async (req, res, next) => {
  try {
    const devId = req.params.developerId || req.user?.id || 'dev-batlytics';
    const metrics = analyticsEngineService.getDeveloperMetrics(devId);
    return res.status(200).json({
      success: true,
      data: metrics,
    });
  } catch (err) {
    next(err);
  }
};
