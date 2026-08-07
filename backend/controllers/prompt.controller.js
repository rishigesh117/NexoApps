/**
 * Prompt Controller — NexoApps Phase 9A
 */

const promptService = require('../services/prompt.service');

const promptController = {
  async listTemplates(req, res) {
    try {
      const templates = await promptService.listTemplates();
      res.json({ success: true, data: templates });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async getTemplateById(req, res) {
    try {
      const template = await promptService.getTemplateById(req.params.id);
      if (!template) {
        return res.status(404).json({ success: false, error: 'Prompt template not found' });
      }
      res.json({ success: true, data: template });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async createTemplate(req, res) {
    try {
      const newTemplate = await promptService.createTemplate({
        ...req.body,
        authorId: req.user?.id || req.body.authorId
      });
      res.status(201).json({ success: true, data: newTemplate });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async addVersion(req, res) {
    try {
      const version = await promptService.addVersion(req.params.id, req.body);
      res.status(201).json({ success: true, data: version });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
};

module.exports = promptController;
