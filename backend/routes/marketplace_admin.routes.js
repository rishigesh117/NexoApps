const express = require('express');
const router = express.Router();
const marketplaceAdminController = require('../controllers/marketplace_admin.controller');

router.get('/analytics', marketplaceAdminController.getAnalytics);

module.exports = router;
