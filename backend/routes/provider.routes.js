/**
 * Provider Routes — NexoApps Phase 9A
 */

const express = require('express');
const router = express.Router();
const { optionalAuthToken } = require('../middleware/auth.middleware');
const providerController = require('../controllers/provider.controller');

router.get('/', optionalAuthToken, providerController.listProviders);
router.post('/', optionalAuthToken, providerController.createProvider);
router.get('/models', optionalAuthToken, providerController.listModels);
router.get('/credentials', optionalAuthToken, providerController.listCredentials);
router.post('/credentials', optionalAuthToken, providerController.addCredential);
router.get('/:id', optionalAuthToken, providerController.getProviderById);

module.exports = router;
