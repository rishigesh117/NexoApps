const express = require('express');
const router = express.Router();
const platformOsController = require('../controllers/platform_os.controller');

router.get('/dashboard', platformOsController.getDashboardMetrics);
router.get('/modules', platformOsController.listModules);
router.get('/health', platformOsController.getModuleHealth);
router.get('/feature-flags', platformOsController.listFeatureFlags);
router.get('/version-history', platformOsController.getVersionHistory);

module.exports = router;
