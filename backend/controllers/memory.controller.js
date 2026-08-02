/**
 * Memory Controller — NexoApps Phase 8C
 */

const conversationMemoryService = require('../services/conversation_memory.service');

const memoryController = {
  async getMemory(req, res) {
    try {
      const memory = await conversationMemoryService.getMemory(req.params.sessionId);
      res.json({ success: true, data: memory });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async createSnapshot(req, res) {
    try {
      const snapshot = await conversationMemoryService.createSnapshot(req.params.sessionId, req.body.snapshotName);
      res.status(201).json({ success: true, data: snapshot });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
};

module.exports = memoryController;
