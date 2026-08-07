/**
 * Plugin Controller — NexoApps Phase 9C
 */

const pluginRegistryService = require('../services/plugin_registry.service');
const pluginInstallationService = require('../services/plugin_installation.service');

const pluginController = {
  async listPlugins(req, res) {
    try {
      const plugins = await pluginRegistryService.listPlugins();
      res.json({ success: true, data: plugins });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async registerPlugin(req, res) {
    try {
      const plugin = await pluginRegistryService.registerPlugin(req.body);
      res.status(201).json({ success: true, data: plugin });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async listInstallations(req, res) {
    try {
      const userId = req.user?.id || req.query.userId || 'user-owner';
      const insts = await pluginInstallationService.listInstallations(userId);
      res.json({ success: true, data: insts });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async installPlugin(req, res) {
    try {
      const userId = req.user?.id || req.body.userId || 'user-owner';
      const inst = await pluginInstallationService.installPlugin(req.body.pluginId, userId);
      res.status(201).json({ success: true, data: inst });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
};

module.exports = pluginController;
