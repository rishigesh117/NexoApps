/**
 * Component Library Controller — NexoApps Phase 9B
 */

const componentLibraryService = require('../services/component_library.service');

const componentLibraryController = {
  async listComponents(req, res) {
    try {
      const components = await componentLibraryService.listComponents();
      res.json({ success: true, data: components });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async listCategories(req, res) {
    try {
      const categories = await componentLibraryService.listCategories();
      res.json({ success: true, data: categories });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async createComponent(req, res) {
    try {
      const comp = await componentLibraryService.createComponent(req.body);
      res.status(201).json({ success: true, data: comp });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
};

module.exports = componentLibraryController;
