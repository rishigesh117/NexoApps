const express = require('express');
const router = express.Router();
const workspaceController = require('../controllers/workspace.controller');

router.get('/workspaces', (req, res) => workspaceController.getWorkspaces(req, res));
router.post('/workspaces', (req, res) => workspaceController.createWorkspace(req, res));
router.get('/workspaces/:id', (req, res) => workspaceController.getWorkspaceById(req, res));
router.get('/workspaces/:id/members', (req, res) => workspaceController.getMembers(req, res));
router.post('/workspaces/:id/members', (req, res) => workspaceController.addMember(req, res));

module.exports = router;
