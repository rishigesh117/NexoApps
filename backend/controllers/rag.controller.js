/**
 * RAG Controller — NexoApps Phase 8C
 */

const ragService = require('../services/rag.service');

const ragController = {
  async listSessions(req, res) {
    try {
      const sessions = await ragService.listSessions(req.params.knowledgeBaseId || 'default');
      res.json({ success: true, data: sessions });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async askQuestion(req, res) {
    try {
      const result = await ragService.askQuestion(req.params.sessionId, req.body.prompt, req.body.knowledgeBaseId);
      res.json({ success: true, data: result });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
};

module.exports = ragController;
