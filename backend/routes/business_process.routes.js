/**
 * Business Process Routes — NexoApps Phase 8D
 */

const express = require('express');
const router = express.Router();
const { optionalAuthToken } = require('../middleware/auth.middleware');
const businessProcessController = require('../controllers/business_process.controller');

router.get('/', optionalAuthToken, businessProcessController.listProcesses);
router.post('/', optionalAuthToken, businessProcessController.createProcess);
router.post('/trigger/:id', optionalAuthToken, businessProcessController.triggerProcess);

module.exports = router;
