/**
 * Collection Routes
 * NexoApps Platform - Phase 4D
 */

const express = require('express');
const router = express.Router();
const collectionController = require('../controllers/collection.controller');
const authenticateToken = require('../middleware/auth.middleware');
const { optionalAuthToken } = require('../middleware/auth.middleware');

router.get('/', optionalAuthToken, collectionController.getCollections);
router.get('/:id', optionalAuthToken, collectionController.getCollectionById);

// Authenticated Collection Actions
router.post('/', authenticateToken, collectionController.createCollection);
router.patch('/:id', authenticateToken, collectionController.updateCollection);
router.delete('/:id', authenticateToken, collectionController.deleteCollection);
router.post('/:id/apps', authenticateToken, collectionController.addApp);
router.delete('/:id/apps/:appId', authenticateToken, collectionController.removeApp);

module.exports = router;
