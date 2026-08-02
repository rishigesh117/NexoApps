/**
 * Connector Controller — NexoApps Phase 8C
 */

const knowledgeConnectorService = require('../services/knowledge_connector.service');

const connectorController = {
  async listConnectors(req, res) {
    try {
      const connectors = await knowledgeConnectorService.listConnectors();
      res.json({ success: true, data: connectors });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async triggerSync(req, res) {
    try {
      const result = await knowledgeConnectorService.triggerSync(req.params.id);
      res.json({ success: true, data: result });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
};

module.exports = connectorController;
