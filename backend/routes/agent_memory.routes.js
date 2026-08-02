/**
 * Agent Memory Routes — NexoApps Phase 8A
 */

const express = require('express');
const router = express.Router();
const { optionalAuthToken } = require('../middleware/auth.middleware');
const agentMemoryController = require('../controllers/agent_memory.controller');

router.get('/:workspaceId', optionalAuthToken, agentMemoryController.getSharedMemory);
router.post('/:workspaceId', optionalAuthToken, agentMemoryController.setMemoryKey);
router.delete('/:id', optionalAuthToken, agentMemoryController.deleteMemoryKey);

module.exports = router;
