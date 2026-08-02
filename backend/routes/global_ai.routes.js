/**
 * Global AI Routes — NexoApps Phase 8E
 */

const express = require('express');
const router = express.Router();
const { optionalAuthToken } = require('../middleware/auth.middleware');
const globalAIController = require('../controllers/global_ai.controller');

router.get('/clusters', optionalAuthToken, globalAIController.listClusters);

module.exports = router;
