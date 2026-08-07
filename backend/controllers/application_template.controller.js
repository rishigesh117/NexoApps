/**
 * Application Template Controller — NexoApps Phase 9B
 */

const applicationTemplateService = require('../services/application_template.service');

const applicationTemplateController = {
  async listTemplates(req, res) {
    try {
      const templates = await applicationTemplateService.listTemplates();
      res.json({ success: true, data: templates });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async getTemplateById(req, res) {
    try {
      const tmpl = await applicationTemplateService.getTemplateById(req.params.id);
      if (!tmpl) return res.status(404).json({ success: false, error: 'Template not found' });
      res.json({ success: true, data: tmpl });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async createTemplate(req, res) {
    try {
      const tmpl = await applicationTemplateService.createTemplate(req.body);
      res.status(201).json({ success: true, data: tmpl });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
};

module.exports = applicationTemplateController;
