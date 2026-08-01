/**
 * Owner Submission Review Routes
 * NexoApps Platform - Phase 4C
 */

const express = require('express');
const router = express.Router();
const submissionController = require('../controllers/submission.controller');
const authenticateToken = require('../middleware/auth.middleware');
const { requireAdmin } = require('../middleware/auth.middleware');

router.use(authenticateToken, requireAdmin);

router.get('/', submissionController.getQueue);
router.post('/:id/review', submissionController.reviewSubmission);
router.get('/:id/comments', submissionController.getComments);
router.post('/:id/comments', submissionController.addComment);

module.exports = router;
