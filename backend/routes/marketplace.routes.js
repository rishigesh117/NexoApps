/**
 * AI Marketplace Routes
 * NexoApps Platform - Phase 6D (Version 2.4)
 */

const express = require('express');
const router = express.Router();
const marketplaceController = require('../controllers/marketplace.controller');
const { optionalAuthToken } = require('../middleware/auth.middleware');

router.get('/items', optionalAuthToken, marketplaceController.getItems);
router.get('/items/:id', optionalAuthToken, marketplaceController.getItemById);
router.post('/items', optionalAuthToken, marketplaceController.publishItem);
router.get('/collections', optionalAuthToken, marketplaceController.getCollections);

module.exports = router;
