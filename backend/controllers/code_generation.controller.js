/**
 * Code Generation Controller — NexoApps Phase 9D
 */

const codeGenerationService = require('../services/code_generation.service');

const codeGenerationController = {
  async generateCode(req, res) {
    try {
      const { projectId, prompt, targetFilePath } = req.body;
      const gen = await codeGenerationService.generateCode(projectId, prompt, targetFilePath);
      res.status(201).json({ success: true, data: gen });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
};

module.exports = codeGenerationController;
