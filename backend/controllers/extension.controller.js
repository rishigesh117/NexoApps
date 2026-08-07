/**
 * Extension Controller — NexoApps Phase 9C
 */

const extensionService = require('../services/extension.service');
const licenseService = require('../services/license.service');

const extensionController = {
  async listExtensions(req, res) {
    try {
      const exts = await extensionService.listExtensions();
      res.json({ success: true, data: exts });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async registerExtension(req, res) {
    try {
      const ext = await extensionService.registerExtension(req.body);
      res.status(201).json({ success: true, data: ext });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async listLicenses(req, res) {
    try {
      const userId = req.user?.id || req.query.userId || 'user-owner';
      const licenses = await licenseService.listLicenses(userId);
      res.json({ success: true, data: licenses });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async generateLicense(req, res) {
    try {
      const userId = req.user?.id || req.body.userId || 'user-owner';
      const lic = await licenseService.generateLicense(req.body.itemId, userId, req.body.licenseType);
      res.status(201).json({ success: true, data: lic });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
};

module.exports = extensionController;
