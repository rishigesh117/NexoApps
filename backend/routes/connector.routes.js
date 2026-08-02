/**
 * Connector Routes — NexoApps Phase 8C
 */

const express = require('express');
const router = express.Router();
const { optionalAuthToken } = require('../middleware/auth.middleware');
const connectorController = require('../controllers/connector.controller');

router.get('/', optionalAuthToken, connectorController.listConnectors);
router.post('/:id/sync', optionalAuthToken, connectorController.triggerSync);

module.exports = router;
