/**
 * Governance Controller — NexoApps Phase 10C
 */

const dataQualityService = require('../services/data_quality.service');
const masterDataService = require('../services/master_data.service');
const metadataService = require('../services/metadata.service');

class GovernanceController {
  async getQualityRules(req, res) {
    try {
      const rules = await dataQualityService.getQualityRules();
      res.json({ success: true, data: rules });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getMasterData(req, res) {
    try {
      const mdm = await masterDataService.getMasterData();
      res.json({ success: true, data: mdm });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getLineage(req, res) {
    try {
      const lineage = await metadataService.getLineage();
      res.json({ success: true, data: lineage });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new GovernanceController();
