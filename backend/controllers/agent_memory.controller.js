/**
 * Agent Memory Controller — NexoApps Phase 8A
 */

const agentMemoryService = require('../services/agent_memory.service');

const agentMemoryController = {
  async getSharedMemory(req, res) {
    try {
      const memory = await agentMemoryService.getSharedMemory(req.params.workspaceId);
      res.json({ success: true, data: memory });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async setMemoryKey(req, res) {
    try {
      const result = await agentMemoryService.setMemoryKey(req.params.workspaceId, req.body);
      res.status(201).json({ success: true, data: result });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async deleteMemoryKey(req, res) {
    try {
      const result = await agentMemoryService.deleteMemoryKey(req.params.id);
      res.json({ success: true, data: result });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
};

module.exports = agentMemoryController;
