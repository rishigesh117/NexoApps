const express = require('express');
const router = express.Router();
const workspaceController = require('../controllers/enterprise_workspace.controller');

router.get('/workspaces', (req, res) => workspaceController.getWorkspaces(req, res));
router.post('/workspaces', (req, res) => workspaceController.createWorkspace(req, res));

module.exports = router;
