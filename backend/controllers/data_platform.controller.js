/**
 * Data Platform Controller — NexoApps Phase 10C
 */

const dataSourceService = require('../services/data_source.service');
const lakehouseService = require('../services/lakehouse.service');
const dataCatalogService = require('../services/data_catalog.service');

class DataPlatformController {
  async getDataSources(req, res) {
    try {
      const sources = await dataSourceService.getDataSources();
      res.json({ success: true, data: sources });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async addDataSource(req, res) {
    try {
      const ds = await dataSourceService.addDataSource(req.body);
      res.json({ success: true, data: ds });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getLakehouses(req, res) {
    try {
      const lakehouses = await lakehouseService.getLakehouses();
      res.json({ success: true, data: lakehouses });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getCatalog(req, res) {
    try {
      const catalog = await dataCatalogService.getCatalog();
      res.json({ success: true, data: catalog });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new DataPlatformController();
