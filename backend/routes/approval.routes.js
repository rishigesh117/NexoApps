/**
 * Approval Routes — NexoApps Phase 11C
 * Version 8.3
 */

const express = require('express');
const router = express.Router();
const { optionalAuthToken } = require('../middleware/auth.middleware');
const approvalController = require('../controllers/approval.controller');

router.get('/requests/:approverId', optionalAuthToken, approvalController.listRequests);
router.post('/resolve/:id', optionalAuthToken, approvalController.resolveRequest);

// Phase 11C Extensions
router.get('/workflows', optionalAuthToken, approvalController.listWorkflows);
router.post('/requests', optionalAuthToken, approvalController.createApprovalRequest);
router.post('/requests/:id/action', optionalAuthToken, approvalController.recordAction);

module.exports = router;
