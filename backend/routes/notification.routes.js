/**
 * User Notification Routes
 * NexoApps Platform - Phase 4D
 */

const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification.controller');
const authenticateToken = require('../middleware/auth.middleware');

router.use(authenticateToken);

router.get('/', notificationController.getNotifications);
router.post('/read', notificationController.markAsRead);

module.exports = router;
