/**
 * Visual Editor Routes — NexoApps Phase 9B
 */

const express = require('express');
const router = express.Router();
const { optionalAuthToken } = require('../middleware/auth.middleware');
const visualEditorController = require('../controllers/visual_editor.controller');

router.get('/session/:applicationId', optionalAuthToken, visualEditorController.getEditorSession);
router.post('/cursor/:applicationId', optionalAuthToken, visualEditorController.updateCursor);
router.get('/workflows/:applicationId', optionalAuthToken, visualEditorController.listWorkflows);
router.post('/workflows/:applicationId', optionalAuthToken, visualEditorController.saveWorkflow);

module.exports = router;
