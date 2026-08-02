/**
 * Enterprise Controller — NexoApps Phase 8D
 */

const digitalEmployeeService = require('../services/digital_employee.service');
const enterpriseDashboardService = require('../services/enterprise_dashboard.service');
const organizationMetricsService = require('../services/organization_metrics.service');

const enterpriseController = {
  async listDepartments(req, res) {
    try {
      const depts = await digitalEmployeeService.listDepartments(req.query.tenantId || 'default');
      res.json({ success: true, data: depts });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async listEmployees(req, res) {
    try {
      const employees = await digitalEmployeeService.listEmployees(req.params.departmentId || 'all');
      res.json({ success: true, data: employees });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async createEmployee(req, res) {
    try {
      const employee = await digitalEmployeeService.createEmployee(req.params.departmentId, req.body);
      res.status(201).json({ success: true, data: employee });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async getDashboard(req, res) {
    try {
      const dashboard = await enterpriseDashboardService.getDashboard(req.query.tenantId || 'default');
      res.json({ success: true, data: dashboard });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async getMetrics(req, res) {
    try {
      const metrics = await organizationMetricsService.getMetrics(req.params.departmentId || 'all');
      res.json({ success: true, data: metrics });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
};

module.exports = enterpriseController;
