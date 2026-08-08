/**
 * Observability Controller — NexoApps Phase 12C (v9.3)
 */

const observabilityProjectService = require('../services/observability_project.service');
const serviceMonitorService = require('../services/service_monitor.service');
const dependencyMapService = require('../services/dependency_map.service');
const observabilityDashboardService = require('../services/observability_dashboard.service');
const performanceIntelligenceService = require('../services/performance_intelligence.service');

class ObservabilityController {
  async getOverview(req, res) {
    try {
      const data = await observabilityDashboardService.getOverviewData();
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getProjects(req, res) {
    try {
      const projects = await observabilityProjectService.getProjects();
      res.json({ success: true, data: projects });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async createProject(req, res) {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({ success: false, error: 'Project name is required' });
      }
      const project = await observabilityProjectService.createProject(req.body);
      res.status(201).json({ success: true, data: project });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getServices(req, res) {
    try {
      const services = await serviceMonitorService.getServices(req.query.projectId);
      res.json({ success: true, data: services });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getServiceById(req, res) {
    try {
      const service = await serviceMonitorService.getServiceById(req.params.id);
      if (!service) {
        return res.status(404).json({ success: false, error: 'Service not found' });
      }
      res.json({ success: true, data: service });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getDependencies(req, res) {
    try {
      const graph = await dependencyMapService.getDependencyGraph();
      res.json({ success: true, data: graph });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getDashboards(req, res) {
    try {
      const dashboards = await observabilityDashboardService.getDashboards();
      res.json({ success: true, data: dashboards });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async createDashboard(req, res) {
    try {
      const { title } = req.body;
      if (!title) {
        return res.status(400).json({ success: false, error: 'Dashboard title is required' });
      }
      const dash = await observabilityDashboardService.createDashboard(req.body);
      res.status(201).json({ success: true, data: dash });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getAIRecommendations(req, res) {
    try {
      const recommendations = await performanceIntelligenceService.getAIRecommendations();
      res.json({ success: true, data: recommendations });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new ObservabilityController();
