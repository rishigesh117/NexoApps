/**
 * User Routes
 * NexoApps Platform
 */

const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authenticateToken = require('../middleware/auth.middleware');
const { requireMember } = require('../middleware/role.middleware');

router.get('/me', authenticateToken, requireMember, userController.getProfile);
router.patch('/profile', authenticateToken, requireMember, userController.updateProfile);

module.exports = router;
