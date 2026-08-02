/**
 * Dashboard Builder Controller — NexoApps Phase 7C
 */

const dashboardBuilderService = require('../services/dashboard_builder.service');
const executiveDashboardService = require('../services/executive_dashboard.service');

const dashboardBuilderController = {
  async listDashboards(req, res) {
    try {
      const dashboards = await dashboardBuilderService.listDashboards(req.query.tenantId || 'default');
      res.json({ success: true, data: dashboards });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async getDashboard(req, res) {
    try {
      const dashboard = await dashboardBuilderService.getDashboard(req.params.id);
      res.json({ success: true, data: dashboard });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async createDashboard(req, res) {
    try {
      const dashboard = await dashboardBuilderService.createDashboard(req.body);
      res.status(201).json({ success: true, data: dashboard });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async updateDashboard(req, res) {
    try {
      const dashboard = await dashboardBuilderService.updateDashboard(req.params.id, req.body);
      res.json({ success: true, data: dashboard });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async deleteDashboard(req, res) {
    try {
      const result = await dashboardBuilderService.deleteDashboard(req.params.id);
      res.json({ success: true, data: result });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async listWidgets(req, res) {
    try {
      const widgets = await dashboardBuilderService.listWidgets(req.params.id);
      res.json({ success: true, data: widgets });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async addWidget(req, res) {
    try {
      const widget = await dashboardBuilderService.addWidget(req.params.id, req.body);
      res.status(201).json({ success: true, data: widget });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async removeWidget(req, res) {
    try {
      const result = await dashboardBuilderService.removeWidget(req.params.widgetId);
      res.json({ success: true, data: result });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async listExecutiveDashboards(req, res) {
    try {
      const dashboards = await executiveDashboardService.listDashboards(req.query.tenantId || 'default');
      res.json({ success: true, data: dashboards });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async getExecutiveSummary(req, res) {
    try {
      const summary = await executiveDashboardService.getExecutiveSummary(req.query.tenantId || 'default');
      res.json({ success: true, data: summary });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
};

module.exports = dashboardBuilderController;
