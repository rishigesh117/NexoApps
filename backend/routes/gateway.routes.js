/**
 * Gateway Routes — NexoApps Phase 9A
 */

const express = require('express');
const router = express.Router();
const { optionalAuthToken } = require('../middleware/auth.middleware');
const gatewayController = require('../controllers/gateway.controller');

router.post('/route', optionalAuthToken, gatewayController.routeModel);
router.get('/comparison', optionalAuthToken, gatewayController.getModelComparison);
router.get('/analytics/tokens', optionalAuthToken, gatewayController.getTokenAnalytics);
router.get('/health', optionalAuthToken, gatewayController.getProviderHealthGrid);
router.get('/fallbacks', optionalAuthToken, gatewayController.getFallbackPolicies);
router.post('/fallbacks', optionalAuthToken, gatewayController.createFallbackPolicy);
router.post('/multimodal', optionalAuthToken, gatewayController.processMultimodal);
router.post('/generate-image', optionalAuthToken, gatewayController.generateImage);
router.post('/speech', optionalAuthToken, gatewayController.processSpeech);
router.post('/translate', optionalAuthToken, gatewayController.processTranslation);

module.exports = router;
