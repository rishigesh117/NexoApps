/**
 * Developer Follow Routes
 * NexoApps Platform - Phase 4D
 */

const express = require('express');
const router = express.Router();
const followController = require('../controllers/follow.controller');
const authenticateToken = require('../middleware/auth.middleware');
const { optionalAuthToken } = require('../middleware/auth.middleware');

router.get('/status/:developerId', optionalAuthToken, followController.getStatus);
router.post('/:developerId', authenticateToken, followController.follow);
router.delete('/:developerId', authenticateToken, followController.unfollow);

module.exports = router;
