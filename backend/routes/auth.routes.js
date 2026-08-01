/**
 * Authentication Routes Blueprint
 * NexoApps Platform
 */

const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { validateSignupPayload, validateLoginPayload } = require('../middleware/validation.middleware');
const { checkAccountLock } = require('../middleware/accountLock.middleware');

// Public Auth Endpoints
router.post('/signup', validateSignupPayload, authController.signup);
router.post('/login', validateLoginPayload, checkAccountLock, authController.login);
router.post('/logout', authController.logout);
router.post('/refresh', authController.refresh);
router.post('/verify-email', authController.verifyEmail);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

module.exports = router;
