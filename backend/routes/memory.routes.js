/**
 * Memory Routes — NexoApps Phase 8C
 */

const express = require('express');
const router = express.Router();
const { optionalAuthToken } = require('../middleware/auth.middleware');
const memoryController = require('../controllers/memory.controller');

router.get('/:sessionId', optionalAuthToken, memoryController.getMemory);
router.post('/:sessionId/snapshot', optionalAuthToken, memoryController.createSnapshot);

module.exports = router;
