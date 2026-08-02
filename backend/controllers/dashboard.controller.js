/**
 * Dashboard Controller
 * NexoApps Platform - Phase 6E (Version 2.5)
 */

const dashboardService = require('../services/dashboard.service');
const widgetService = require('../services/widget.service');

exports.getDashboardData = async (req, res, next) => {
  try {
    const metrics = dashboardService.getOverviewMetrics();
    const continueWorking = dashboardService.getContinueWorkingItems();
    const widgets = widgetService.getWidgets();
    return res.status(200).json({
      success: true,
      data: { metrics, continueWorking, widgets },
    });
  } catch (err) {
    next(err);
  }
};
