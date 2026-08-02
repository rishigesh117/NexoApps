/**
 * Analytics V2 Controller — NexoApps Phase 7C
 */

const analyticsV2Service = require('../services/analytics_v2.service');
const businessIntelligenceService = require('../services/business_intelligence.service');
const warehouseService = require('../services/warehouse.service');
const dataQualityService = require('../services/data_quality.service');

const analyticsV2Controller = {
  async getDashboardOverview(req, res) {
    try {
      const overview = await businessIntelligenceService.getDashboardOverview(req.query.tenantId || 'default');
      res.json({ success: true, data: overview });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async listModels(req, res) {
    try {
      const models = await analyticsV2Service.listModels(req.query.tenantId || 'default');
      res.json({ success: true, data: models });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async getModel(req, res) {
    try {
      const model = await analyticsV2Service.getModel(req.params.id);
      res.json({ success: true, data: model });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async createModel(req, res) {
    try {
      const model = await analyticsV2Service.createModel(req.body);
      res.status(201).json({ success: true, data: model });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async trainModel(req, res) {
    try {
      const result = await analyticsV2Service.trainModel(req.params.id);
      res.json({ success: true, data: result });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async listKPIs(req, res) {
    try {
      const kpis = await analyticsV2Service.listKPIs(req.query.tenantId || 'default');
      res.json({ success: true, data: kpis });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async createKPI(req, res) {
    try {
      const kpi = await analyticsV2Service.createKPI(req.body);
      res.status(201).json({ success: true, data: kpi });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async getRevenueInsights(req, res) {
    try {
      const insights = await businessIntelligenceService.getRevenueInsights(req.query.tenantId || 'default');
      res.json({ success: true, data: insights });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async getUserInsights(req, res) {
    try {
      const insights = await businessIntelligenceService.getUserInsights(req.query.tenantId || 'default');
      res.json({ success: true, data: insights });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async getPlatformInsights(req, res) {
    try {
      const insights = await businessIntelligenceService.getPlatformInsights(req.query.tenantId || 'default');
      res.json({ success: true, data: insights });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async listDataSources(req, res) {
    try {
      const sources = await warehouseService.listDataSources(req.query.tenantId || 'default');
      res.json({ success: true, data: sources });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async createDataSource(req, res) {
    try {
      const source = await warehouseService.createDataSource(req.body);
      res.status(201).json({ success: true, data: source });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async listWarehouseTables(req, res) {
    try {
      const tables = await warehouseService.listTables(req.query.tenantId || 'default');
      res.json({ success: true, data: tables });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async getDataQuality(req, res) {
    try {
      const overview = await dataQualityService.getOverview(req.query.tenantId || 'default');
      const logs = await dataQualityService.listLogs(req.query.tenantId || 'default');
      res.json({ success: true, data: { overview, logs } });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async getDatasetCatalog(req, res) {
    try {
      const catalog = await analyticsV2Service.listDatasetCatalog(req.query.tenantId || 'default');
      res.json({ success: true, data: catalog });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
};

module.exports = analyticsV2Controller;
