/**
 * Software Project Controller — NexoApps Phase 9D
 */

const softwareProjectService = require('../services/software_project.service');
const developerAssistantService = require('../services/developer_assistant.service');

const softwareProjectController = {
  async listProjects(req, res) {
    try {
      const ownerId = req.user?.id || req.query.ownerId || 'user-owner';
      const projects = await softwareProjectService.listProjects(ownerId);
      res.json({ success: true, data: projects });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async getProjectById(req, res) {
    try {
      const proj = await softwareProjectService.getProjectById(req.params.id);
      if (!proj) return res.status(404).json({ success: false, error: 'Software project not found' });
      res.json({ success: true, data: proj });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async createProject(req, res) {
    try {
      const proj = await softwareProjectService.createProject(req.body);
      res.status(201).json({ success: true, data: proj });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async askAssistant(req, res) {
    try {
      const ans = await developerAssistantService.askAssistant(req.params.id, req.body.prompt);
      res.json({ success: true, data: ans });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
};

module.exports = softwareProjectController;
