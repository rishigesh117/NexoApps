/**
 * Developer Routes
 * NexoApps Platform - Phase 3E
 */

const express = require('express');
const router = express.Router();
const developerController = require('../controllers/developer.controller');
const authenticateToken = require('../middleware/auth.middleware');
const { requireAdmin } = require('../middleware/auth.middleware');

router.use(authenticateToken, requireAdmin);

router.get('/', developerController.getDevelopers);
router.patch('/:id', developerController.updateDeveloper);
router.post('/:id/assign', developerController.assignApp);

module.exports = router;
