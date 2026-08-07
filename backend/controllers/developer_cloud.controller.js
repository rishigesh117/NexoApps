/**
 * Developer Cloud Controller — NexoApps Phase 11A (v8.1)
 */

const developerDashboardService = require('../services/developer_dashboard.service');
const developerCloudService = require('../services/developer_cloud.service');
const buildRunnerService = require('../services/build_runner.service');

class DeveloperCloudController {
  async getOverview(req, res) {
    try {
      const overview = await developerDashboardService.getOverview();
      res.json({ success: true, data: overview });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getOrganizations(req, res) {
    try {
      const orgs = await developerCloudService.getOrganizations();
      res.json({ success: true, data: orgs });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getTeams(req, res) {
    try {
      const teams = await developerCloudService.getTeams();
      res.json({ success: true, data: teams });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getRunners(req, res) {
    try {
      const runners = await buildRunnerService.getRunners();
      res.json({ success: true, data: runners });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new DeveloperCloudController();
