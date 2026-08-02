/**
 * Approval Routes — NexoApps Phase 8D
 */

const express = require('express');
const router = express.Router();
const { optionalAuthToken } = require('../middleware/auth.middleware');
const approvalController = require('../controllers/approval.controller');

router.get('/requests/:approverId', optionalAuthToken, approvalController.listRequests);
router.post('/resolve/:id', optionalAuthToken, approvalController.resolveRequest);

module.exports = router;
