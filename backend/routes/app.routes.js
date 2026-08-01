/**
 * App Routes
 * NexoApps Platform
 */

const express = require('express');
const router = express.Router();
const appController = require('../controllers/app.controller');

router.get('/', appController.getAllApps);
router.get('/featured', appController.getFeaturedApps);
router.get('/trending', appController.getTrendingApps);
router.get('/new', appController.getNewApps);
router.get('/search', appController.searchApps);
router.get('/category/:category', appController.getCategoryApps);
router.get('/:slug', appController.getAppBySlug);
router.get('/:slug/related', appController.getRelatedApps);
router.get('/:slug/changelog', appController.getChangelog);
router.get('/:slug/versions', appController.getVersionHistory);

module.exports = router;
