/**
 * Dashboard Controller Layer
 * NexoApps Platform - Phase 3E
 */

const dashboardService = require('../services/dashboard.service');
const adminService = require('../services/admin.service');

class DashboardController {
  // GET /api/v1/admin/dashboard
  getDashboardOverview(req, res) {
    try {
      const stats = dashboardService.getDashboardStats();
      const systemHealth = dashboardService.getSystemHealth();
      const activity = adminService.getActivityLogs(10);
      const analytics = dashboardService.getAnalyticsData();

      return res.status(200).json({
        success: true,
        data: {
          stats,
          systemHealth,
          activity,
          analytics,
        },
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  // GET /api/v1/admin/stats
  getStats(req, res) {
    try {
      const stats = dashboardService.getDashboardStats();
      return res.status(200).json({
        success: true,
        data: stats,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  // GET /api/v1/admin/activity
  getActivity(req, res) {
    try {
      const activity = adminService.getActivityLogs(20);
      return res.status(200).json({
        success: true,
        data: activity,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }
}

module.exports = new DashboardController();
